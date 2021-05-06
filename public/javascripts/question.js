window.addEventListener("DOMContentLoaded", async (event) => {
  console.log("hello from questions.js!");
  const tempVote = document.querySelector('.upVoteButton')
  const upVote = document.querySelector(".fa-caret-square-up")
    const downVote = document.querySelector(".fa-caret-square-down")
const deleteQuestion = document.querySelector(".delete-question-btn");






  deleteQuestion.addEventListener("click", async (e) => {
    console.log("button click")
    const target = e.target;
    const id = target.id;
    await deleteItem("question", "questions", id, "");
  });

});



const deleteItem = async function (type, route, id, reroute) {
  console.groupCollapsed(id);

  try {
    const res = await fetch(`/${route}/${id}`, {
      method: "DELETE",
    });
    window.alert(`${type} sucessfully deleted.`);
    window.location.href = "http://localhost:8080/";
  } catch (err) {
    window.alert("error: " + err);
  }
};


async function vote(upOrDownCode, questionId) {
    try {
        await fetch(`http://localhost:8080/questions/${questionId}/vote`, { method: `DELETE` })
        await fetch(`http://localhost:8080/questions/${questionId}/vote/${upOrDownCode}`, { method: `POST` })

        //TBD add class to allow button visual reaction:
    }
    catch (err) { console.log("question vote error", err); };
  }
  async function extractResponse(res) {
      if (!res.ok) throw res;
      const data = await res.json();
      console.log(`your vote has been counted`);
      return data;
  }
