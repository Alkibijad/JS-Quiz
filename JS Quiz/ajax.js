let xml = new XMLHttpRequest();
xml.open(
  "get",
  "https://raw.githubusercontent.com/zile028/fake-db/main/all_questions.json"
);

xml.onreadystatechange = function () {
  if (xml.readyState === 4 && xml.status === 200) {
    let data = JSON.parse(xml.response);
    createQuiz(data);
  }
};

xml.send();
