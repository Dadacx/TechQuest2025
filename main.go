package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	_ "github.com/lib/pq"
)

type jsonCharResponse struct {
    Id int                      `json:"id"`
    Nazwa string                `json:"name"`
    Avatar string               `json:"avatar"`
    Prompt_zachowania string    `json:"behaviour"`
}

type jsonHisResponse struct {
    Id int
    Tytul *string
    Prompt string
    Odp string
    Assistant int
}

type jsonBookResponse struct {
    Id int
    Nazwa string
    Workings string
}

func readHisDatabase(w http.ResponseWriter, req *http.Request) {
    fmt.Println("Handling HIS GET..")

    cfg := "user=postgres dbname=techquest sslmode=disable"
    db, err := sql.Open("postgres", cfg)
    if err != nil {
        fmt.Println("1", err)
        return 
    }

    rows, err := db.Query("SELECT * FROM historia")
    if err != nil {
        fmt.Println("2", err)
        return 
    }
    responses := []jsonHisResponse{}
    single_res := jsonHisResponse{}
    for {
        rows.Next()
        err := rows.Scan(&single_res.Id, &single_res.Tytul, &single_res.Prompt ,&single_res.Odp, &single_res.Assistant)
        if err != nil {
            fmt.Println(err)
            break
        }
        responses = append(responses, single_res)
    }
    jsonowski, err := json.Marshal(responses)
    if err != nil {
        fmt.Println(err)
        return 
    }

    fmt.Fprintf(w, "%s", jsonowski)
    db.Close()
}

func putHisDatabase(w http.ResponseWriter, req *http.Request) {
    fmt.Println("Handling HIS POST...")
    body, err := io.ReadAll(req.Body)
    if err != nil {
        w.WriteHeader(422)
        fmt.Println(err)
        fmt.Fprintf(w, "%s", err)
        return 
    }
    
    unwrappedJson := jsonHisResponse{}
    json.Unmarshal(body, &unwrappedJson)
    if unwrappedJson.Prompt == "" || unwrappedJson.Odp == "" {
        w.WriteHeader(422)
        fmt.Fprintf(w, "Potrzebuje wszystkich pol: Prompt, Odp i Assistant")
        return
    }

    cfg := "user=postgres dbname=techquest sslmode=disable"
    db, err := sql.Open("postgres", cfg)
    if err != nil {
        w.WriteHeader(500)
        fmt.Println("1", err)
        fmt.Fprintf(w, "%s", err)
        return 
    }

    ressult, err := db.Exec("INSERT INTO historia (tytul, prompt, odp, assistant) VALUES ($1, $2, $3, $4)", unwrappedJson.Tytul, unwrappedJson.Prompt, unwrappedJson.Odp, unwrappedJson.Assistant)
    fmt.Printf("ressult: %v\n", ressult)
    if err != nil {
        w.WriteHeader(500)
        fmt.Println("2", err)
        fmt.Fprintf(w, "%s", err)
        return 
    }
    var tytulString string
    if unwrappedJson.Tytul == nil {
        tytulString = "nil"
    } else { tytulString = *unwrappedJson.Tytul }
    fmt.Fprintf(w, "(%s %s %s %s), dodane do bazy", tytulString, unwrappedJson.Prompt, unwrappedJson.Odp, unwrappedJson.Assistant)
    db.Close()
}

func readCharDatabase(w http.ResponseWriter, req *http.Request) {
    fmt.Println("Handling CHARACTER GET..")

    cfg := "user=postgres dbname=techquest sslmode=disable"
    db, err := sql.Open("postgres", cfg)
    if err != nil {
        fmt.Println("1", err)
        return 
    }

    rows, err := db.Query("SELECT * FROM waifu")
    if err != nil {
        fmt.Println("2", err)
        return 
    }
    responses := []jsonCharResponse{}
    single_res := jsonCharResponse{}
    for {
        rows.Next()
        err := rows.Scan(&single_res.Nazwa, &single_res.Avatar, &single_res.Prompt_zachowania,&single_res.Id)
        if err != nil {
            fmt.Println(err)
            break
        }
        responses = append(responses, single_res)
    }
    jsonowski, err := json.Marshal(responses)
    if err != nil {
        fmt.Println(err)
        return 
    }

    fmt.Fprintf(w, "%s", jsonowski)
    db.Close()
}


func putCharDatabase(w http.ResponseWriter, req *http.Request) {
    fmt.Println("Handling CHARACTER POST...")
    body, err := io.ReadAll(req.Body)
    if err != nil {
        w.WriteHeader(422)
        fmt.Println(err)
        fmt.Fprintf(w, "%s", err)
        return 
    }
    
    unwrappedJson := jsonCharResponse{}
    json.Unmarshal(body, &unwrappedJson)
    if unwrappedJson.Nazwa == "" || unwrappedJson.Avatar == "" || unwrappedJson.Prompt_zachowania == "" {
        w.WriteHeader(422)
        fmt.Fprintf(w, "Potrzebuje wszystkich pol: Nazwa, Avatar i Prompt_zachowania")
        return
    }

    cfg := "user=postgres dbname=techquest sslmode=disable"
    db, err := sql.Open("postgres", cfg)
    if err != nil {
        w.WriteHeader(500)
        fmt.Println("1", err)
        fmt.Fprintf(w, "%s", err)
        return 
    }

    ressult, err := db.Exec("INSERT INTO waifu (nazwa, avatar, prompt_zachowania) VALUES ($1, $2, $3)", unwrappedJson.Nazwa, unwrappedJson.Avatar, unwrappedJson.Prompt_zachowania)
    fmt.Printf("ressult: %v\n", ressult)
    if err != nil {
        w.WriteHeader(500)
        fmt.Println("2", err)
        fmt.Fprintf(w, "%s", err)
        return 
    }
    fmt.Fprintf(w, "(%s %s %s), dodane do bazy", unwrappedJson.Nazwa, unwrappedJson.Avatar, unwrappedJson.Prompt_zachowania)
    db.Close()
}

func deleteBookDatabase(w http.ResponseWriter, req *http.Request) {
    fmt.Println("Handling BOOKMARKS DELETE...")
    body, err := io.ReadAll(req.Body)
    if err != nil {
        w.WriteHeader(422)
        fmt.Println(err)
        fmt.Fprintf(w, "%s", err)
        return 
    }
    fmt.Printf("%s", body)
    
    unwrappedJson := jsonBookResponse{}
    json.Unmarshal(body, &unwrappedJson)
    if unwrappedJson.Nazwa == "" {
        w.WriteHeader(422)
        fmt.Fprintf(w, "Potrzebuje wszystkich pol: Nazwa")
        return
    }

    cfg := "user=postgres dbname=techquest sslmode=disable"
    db, err := sql.Open("postgres", cfg)
    if err != nil {
        w.WriteHeader(500)
        fmt.Println("1", err)
        fmt.Fprintf(w, "%s", err)
        return 
    }

    ressult, err := db.Exec("DELETE FROM zakladki WHERE nazwa = $1", unwrappedJson.Nazwa)
    fmt.Printf("ressult: %v\n", ressult)
    if err != nil {
        w.WriteHeader(500)
        fmt.Println("2", err)
        fmt.Fprintf(w, "%s", err)
        return 
    }
    fmt.Fprintf(w, "(%s), usuniete z bazy", unwrappedJson.Nazwa)
    db.Close()
}

func putBookDatabase(w http.ResponseWriter, req *http.Request) {
    fmt.Println("Handling BOOKMARKS POST...")
    body, err := io.ReadAll(req.Body)
    if err != nil {
        w.WriteHeader(422)
        fmt.Println(err)
        fmt.Fprintf(w, "%s", err)
        return 
    }
    
    unwrappedJson := jsonBookResponse{}
    json.Unmarshal(body, &unwrappedJson)
    if unwrappedJson.Nazwa == "" {
        w.WriteHeader(422)
        fmt.Fprintf(w, "Potrzebuje wszystkich pol: Nazwa")
        return
    }

    cfg := "user=postgres dbname=techquest sslmode=disable"
    db, err := sql.Open("postgres", cfg)
    if err != nil {
        w.WriteHeader(500)
        fmt.Println("1", err)
        fmt.Fprintf(w, "%s", err)
        return 
    }

    ressult, err := db.Exec("INSERT INTO zakladki (nazwa, workings) VALUES ($1, $2)", unwrappedJson.Nazwa, unwrappedJson.Workings)
    fmt.Printf("ressult: %v\n", ressult)
    if err != nil {
        w.WriteHeader(500)
        fmt.Println("2", err)
        fmt.Fprintf(w, "%s", err)
        return 
    }
    fmt.Fprintf(w, "(%s %s), dodane do bazy", unwrappedJson.Nazwa, unwrappedJson.Workings)
    db.Close()
}

func readBookDatabase(w http.ResponseWriter, req *http.Request) {
    fmt.Println("Handling BOOK GET..")

    cfg := "user=postgres dbname=techquest sslmode=disable"
    db, err := sql.Open("postgres", cfg)
    if err != nil {
        fmt.Println("1", err)
        return 
    }

    rows, err := db.Query("SELECT * FROM zakladki")
    if err != nil {
        fmt.Println("2", err)
        return 
    }
    responses := []jsonBookResponse{}
    single_res := jsonBookResponse{}
    for {
        rows.Next()
        err := rows.Scan(&single_res.Id, &single_res.Nazwa, &single_res.Workings)
        if err != nil {
            fmt.Println(err)
            break
        }
        responses = append(responses, single_res)
    }
    jsonowski, err := json.Marshal(responses)
    if err != nil {
        fmt.Println(err)
        return 
    }

    fmt.Fprintf(w, "%s", jsonowski)
    db.Close()
}

func handleBookmarks(w http.ResponseWriter, req *http.Request) {
    CORS(&w)

    switch req.Method {
        case "GET":
            readBookDatabase(w, req)
        case "POST":
            putBookDatabase(w, req)
        case "DELETE":
            deleteBookDatabase(w, req)
    }
}

func handleHistory(w http.ResponseWriter, req *http.Request) {
    CORS(&w)

    switch req.Method {
        case "GET":
            readHisDatabase(w, req)
        case "POST":
            putHisDatabase(w, req)
    }
}

func handleCharacters(w http.ResponseWriter, req *http.Request) {
    CORS(&w)

    switch req.Method {
        case "GET":
            readCharDatabase(w, req)
        case "POST":
            putCharDatabase(w, req)
    }
}

func CORS(w *http.ResponseWriter) {
    (*w).Header().Add("Access-Control-Allow-Origin", "*")
    (*w).Header().Add("Access-Control-Allow-Methods", "POST, GET, DELETE")
    (*w).Header().Add("Access-Control-Allow-Headers", "Content-Type")
}

func main() {
    http.HandleFunc("/characters", handleCharacters)
    http.HandleFunc("/history", handleHistory)
    http.HandleFunc("/bookmarks", handleBookmarks)
    fmt.Println("Serving..")
    err := http.ListenAndServe(":1122", nil)
    if err != nil {
        fmt.Println(err)
        return 
    }
}
