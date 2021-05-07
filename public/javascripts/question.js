window.addEventListener("DOMContentLoaded", async (event) => {
  // console.log("hello from questions.js!");
  const upVoteQ = document.querySelector(".fa-caret-square-up");
  const downVoteQ = document.querySelector(".fa-caret-square-down");
  const upVoteA = document.querySelector(".fa-caret-square-up");
  const downVoteA = document.querySelector(".fa-caret-square-down");
  const deleteQuestion = document.querySelector(".delete-question-btn");
  const deleteAnswers = document.querySelectorAll(".delete-answer-btn");
  const answerQuestionButton = document.querySelector(
    ".answer-question-button"
  );
  const answersDiv = document.getElementById("answersDiv");

  const answerTextBox = document.getElementById("answer-text-box");

  upVoteQ.addEventListener("click", (e) => vote(1, e.target.id));
  downVoteQ.addEventListener("click", (e) => vote(2, e.target.id));

  answerQuestionButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const id = e.target.id;

    const answerId = await postAnswer(`answerquestion/${id}`, answerTextBox);
    const newAnswerDiv = document.createElement("div");
    newAnswerDiv.setAttribute("id", `answer=${answerId}`);
    newAnswerDiv.innerHTML = answerId;
    answersDiv.appendChild(newAnswerDiv);
  });

  if (deleteQuestion) {
    deleteQuestion.addEventListener("click", async (e) => {
      const target = e.target;
      const id = target.id;
      await deleteItem("Question", "questions", id, "/");
    });
  }

  if (deleteAnswers.length) {
    // Use a for loop to add an event listener to each answer div
    for (let i = 0; i < deleteAnswers.length; i++) {
      deleteAnswers[i].addEventListener("click", async (e) => {
        const target = e.target;
        const id = target.id;

        //pass the appropriate vairables into the deleteItem function
        removeDiv(id);
        await deleteItem("Answer", "answers", id);
      });
    }
  }
});

const removeDiv = function (id) {
  var elemToDelete = document.getElementById(`answer-${id}-div`);
  elemToDelete.parentNode.removeChild(elemToDelete);
};

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

async function postAnswer(route, answerTextBox) {
  textToSend = answerTextBox.value;

  try {
    const res = await fetch(`http://localhost:8080/${route}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ textToSend }),
    });

    const data = await res.json();
    const answerId = data.answerId;
    return answerId;
  } catch (err) {
    console.log(err);
  }
}

async function vote(upOrDownCode, questionId) {

    const upVoteQ = document.querySelector(".fa-caret-square-up");
    const downVoteQ = document.querySelector(".fa-caret-square-down");
    const score = document.querySelector(".question-page-question-score");

    if (upOrDownCode === 1 && upVoteQ.classList.contains('upvoted-arrow')) {
        try {
        await fetch(`http://localhost:8080/questions/${questionId}/vote`, {
            method: `DELETE`,
        });
        } catch (err) {
        console.log("question vote error", err);
        }
        upVoteQ.classList.remove('upvoted-arrow');
        score.innerText--;
        return;
    }

    if (upOrDownCode === 2 && downVoteQ.classList.contains('downvoted-arrow')) {
        try {
        await fetch(`http://localhost:8080/questions/${questionId}/vote`, {
            method: `DELETE`,
        });
        } catch (err) {
        console.log("question vote error", err);
        }
        downVoteQ.classList.remove('downvoted-arrow');
        score.innerText++;
        return;
    }

    try {
        await fetch(`http://localhost:8080/questions/${questionId}/vote`, {
            method: `DELETE`,
        });
        await fetch(
            `http://localhost:8080/questions/${questionId}/vote/${upOrDownCode}`,
            { method: `POST` }
        );


        if (upOrDownCode === 1) {
            score.innerText++;
            if (downVoteQ.classList.contains('downvoted-arrow')) score.innerText++;
            upVoteQ.classList.add('upvoted-arrow');
            downVoteQ.classList.remove('downvoted-arrow');


        } else {
            score.innerText--;
            if (upVoteQ.classList.contains('upvoted-arrow')) score.innerText--;
            downVoteQ.classList.add('downvoted-arrow');
            upVoteQ.classList.remove('upvoted-arrow');
        }
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
