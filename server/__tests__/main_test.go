package test

import ("testing"
  "github.com/chanceeakin/app-for-emma/server"
)

a := main.App

func checkResponseCode(t *testing.T, expected, actual int) {
    if expected != actual {
        t.Errorf("Expected response code %d. Got %d\n", expected, actual)
    }
}

func executeRequest(req *http.Request) *httptest.ResponseRecorder {
    rr := httptest.NewRecorder()
     handler := http.HandlerFunc(GetPersonEndpoint)
     handler.ServeHTTP(rr, req)
     if status := rr.Code; status != http.StatusOK {
       fmt.Printf("Handler returned wrong status code: got %v want %v" , status, http.statusOk);
      }
    return rr
}

func TestGetPersonEndPoint(t *testing.T){
  req, _ := http.NewRequest("GET", "/people/5", nil)
  response := executeRequest(req)
  checkResponseCode(t, http.StatusNotFound, response.Code)
   var m map[string]string
   json.Unmarshal(response.Body.Bytes(), &m)
  if m["error"] != "Product not found" {
        t.Errorf("Expected the 'error' key of the response to be set to 'Product not found'. Got '%s'", m["error"])
    }
}

func TestSmoke (t *testing.T) {

}
