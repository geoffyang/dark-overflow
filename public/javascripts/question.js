window.addEventListener("DOMContentLoaded", async (event) => {
  console.log("hello from questions.js!");

    const upVote = document.querySelector("#fa-caret-square-up");
    const downVote = document.querySelector("#fa-caret-square-down");
  const tempVote = document.querySelector('.upVoteButton')
    // upVote.addEventListener("click", (e) => vote(1, e.target.id));
    // downVote.addEventListener("click", (e) => vote(2, e.target.id));

  tempVote.addEventListener("click", (e) => {
      const target = e.target;
      const questionid = target.id;
      console.log("Vote on q: this is the target", target)
      console.log("Vote on q: this is the id", questionid);
      vote(1, questionid)
  }
  );



  const deleteQuestion = document.querySelector(".delete-question-btn");

  deleteQuestion.addEventListener("click", async (e) => {
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
      await fetch(
        `http://localhost:8080/questions/${parseInt(questionId)}/vote/${parseInt(
          upOrDownCode
        )}`,
        { method: `DELETE` }
      );
      await fetch(
        `http://localhost:8080/questions/${parseInt(questionId)}/vote/${parseInt(
          upOrDownCode
        )}`,
        { method: `POST` }
      );
      //TBD upVote button visual reaction:
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
