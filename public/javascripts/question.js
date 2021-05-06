window.addEventListener("DOMContentLoaded", async (event) => {
  // console.log("hello from questions.js!");
  const upVoteQ = document.querySelector(".fa-caret-square-up");
  const downVoteQ = document.querySelector(".fa-caret-square-down");
  const upVoteA = document.querySelector(".fa-caret-square-up");
  const downVoteA = document.querySelector(".fa-caret-square-down");
  const deleteQuestion = document.querySelector(".delete-question-btn");
  const deleteAnswers = document.querySelectorAll(".delete-answer-btn");
  const answerDiv = document.querySelector("#answersDiv");
  upVoteQ.addEventListener("click", (e) => vote(1, e.target.id));
  downVoteQ.addEventListener("click", (e) => vote(2, e.target.id));

  if (deleteQuestion) {
    addEventListener("click", async (e) => {
      const target = e.target;
      const id = target.id;
      await deleteItem("Question", "questions", id, "/");
    });
  }
  if (deleteAnswers.length) {
    for (let i = 0; i < deleteAnswers.length; i++) {
      console.log(deleteAnswers.length);
      deleteAnswers[i].addEventListener("click", async (e) => {
        const target = e.target;
        const id = target.id;
        await deleteItem("Answer", "answers", id);
        // console.log("attempting reload");

        // $(answerDiv).load("views/question.pug");
      });
    }
  }
});

const deleteItem = async function (type, route, id, reroute) {
  console.groupCollapsed(id);

  try {
    const res = await fetch(`/${route}/${id}`, {
      method: "DELETE",
    });
    window.alert(`${type} sucessfully deleted.`);

    if (reroute) window.location.href = reroute;
  } catch (err) {
    window.alert("error: " + err);
  }
};

async function vote(upOrDownCode, questionId) {
  try {
    await fetch(`http://localhost:8080/questions/${questionId}/vote`, {
      method: `DELETE`,
    });
    await fetch(
      `http://localhost:8080/questions/${questionId}/vote/${upOrDownCode}`,
      { method: `POST` }
    );

    //TBD add class to allow button visual reaction:
  } catch (err) {
    console.log("question vote error", err);
  }
}
async function extractResponse(res) {
  if (!res.ok) throw res;
  const data = await res.json();
  console.log(`your vote has been counted`);
  return data;
}
