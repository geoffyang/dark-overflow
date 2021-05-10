window.addEventListener("DOMContentLoaded", async (event) => {

      const upVoteQ = document.querySelector(".question-page-upvote-question-icon");
    const downVoteQ = document.querySelector(".question-page-downvote-question-icon");
  const deleteQuestion = document.querySelector(".delete-question-btn");
  const deleteAnswers = document.querySelectorAll(".delete-answer-btn");
  const answerQuestionButton = document.querySelector(
    ".answer-question-button"
  );
  const cancelAnswerButton = document.querySelector(".cancel-answer-button");

  const openAnswerQuestion = document.querySelector(".open-answer-question");

  const answersDiv = document.getElementById("answersDiv");

  const answerTextBox = document.querySelector(".answer-text-box");

  const editButton = document.querySelector(".edit-question-btn ");

  const submitEditButton = document.querySelector(
    ".submit-question-edit-button"
  );
  const cancelEditButton = document.querySelector(
    ".cancel-edit-question-button"
  );

  
  let originalTitle = "";
  let originalText = "";
  upVoteQ.addEventListener("click", (e) => questionVote(1, e.target.id));
  downVoteQ.addEventListener("click", (e) => questionVote(2, e.target.id));

  const upVoteA = document.querySelectorAll(".answer-upvote-arrow");
  const downVoteA = document.querySelectorAll(".answer-downvote-arrow");
  upVoteA.forEach(upVoteButton => {
          upVoteButton.addEventListener("click", (e) => answerVote(1, e.target.id));
  })

  downVoteA.forEach(downVoteButton => {
      downVoteButton.addEventListener("click", (e) => answerVote(2, e.target.id));
  })

  if (editButton) {
    editButton.addEventListener("click", (event) => {
      originalTitle = document.querySelector(
        ".question-page-question-box-title"
      ).innerText;
      originalText = document.querySelector(
        ".question-page-question-box-text-paragraph"
      ).innerText;
      document.querySelector(".editQuestionForm").style.display = "block";
    });
  }

  if (openAnswerQuestion) {
    openAnswerQuestion.addEventListener("click", (e) => {
      document.querySelector(".answerQuestionForm").style.display = "block";
    });
  }
  if (cancelAnswerButton) {
    cancelAnswerButton.addEventListener("click", (e) => {

      e.preventDefault();
      document.querySelector(".answerQuestionForm").style.display = "none";
    });
  }

  if (cancelEditButton) {
    cancelEditButton.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector(".editQuestionForm").style.display = "none";
    });
  }
  if (submitEditButton) {
    submitEditButton.addEventListener("click", async (event) => {
      event.preventDefault();
      let title = document.querySelector(".edit-question-title-field").value;
      let text = document.querySelector(".edit-question-text-field").value;
      let chosenCategory = document.querySelector(
        ".edit-question-category-field"
      ).value;
      let categoryText = document.querySelector(
        ".edit-question-category-field"
      );
      let categoryTextValue =
        categoryText.options[categoryText.selectedIndex].text;
      let csrfvalue = document.querySelector(".csrfEdit").value;
      let questionId = document.querySelector(".questionToEditId").value;
      if (title.trim() && text.trim()) {
        try {
          const res = await fetch(
            `/askquestions/${questionId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-CSRF-Token": csrfvalue,
              },

              body: JSON.stringify({ text, title, chosenCategory }),
            }
          );

          // const data = await res.json();
          const pageTitle = document.querySelector(
            ".question-page-question-box-title"
          );
          pageTitle.innerText = title;
          const pageText = document.querySelector(
            ".question-page-question-box-text-paragraph"
          );
          pageText.innerText = text;
          document.querySelector(".editQuestionForm").style.display = "none";
          const categoryText = document.querySelector(
            ".question-page-question-box-category-paragraph"
          );
          categoryText.innerText = categoryTextValue;
        } catch (err) {
          console.log(err);
        }
      }

      if (!title.trim()) {
        document.querySelector(
          ".edit-question-title-field"
        ).value = originalTitle;
      }

      if (!text.trim()) {
        document.querySelector(
          ".edit-question-text-field"
        ).value = originalText;
      }
    });
  }

  if (answerQuestionButton) {
    answerQuestionButton.addEventListener("click", async (e) => {
      e.preventDefault();

      const id = e.target.id;

      const answerId = await postAnswer(`answerquestion/${id}`, answerTextBox);


      const newAnswerDiv = document.createElement("div");

      newAnswerDiv.setAttribute("id", `answer-${id}-div`);

      newAnswerDiv.setAttribute("class", "question-page-answer-box-outer-wrapper");
      const newAnswerButtons = document.createElement("div");

      const newAnswerDelete = document.createElement("BUTTON");
      newAnswerDelete.innerHTML = "Delete answer";
      newAnswerDelete.setAttribute("class", "button");

      newAnswerDelete.addEventListener("click", async (e) => {
        e.preventDefault();
        removeDiv(id);

        await deleteItem("Answer", "answers", answerId);
      });

      newAnswerButtons.appendChild(newAnswerDelete);

      const newAnswerText = document.createElement("div");
      newAnswerText.innerHTML = answerTextBox.value;
      answerTextBox.value = "";
      answersDiv.appendChild(newAnswerDiv);
      newAnswerDiv.appendChild(newAnswerText);
      const answerHr = document.createElement('hr');
      answerHr.setAttribute('class', 'question-page-answer-box-divider')


      newAnswerDiv.appendChild(answerHr);
      const usernameBox = document.createElement('div');
      let userForBox = document.getElementById('layout-greeter').innerText;
      userForBox = userForBox.split(' ')[1];
      usernameBox.setAttribute('class', 'question-page-answer-box-username-answerer');
      usernameBox.innerText = `Answered by: ${userForBox}`;
      newAnswerDiv.appendChild(usernameBox);
      //newAnswerDiv.appendChild(newAnswerButtons);
      const deleteAnswerButton = document.createElement('i');
      deleteAnswerButton.setAttribute('class', 'fas');
      deleteAnswerButton.classList.add('fa-trash');
      deleteAnswerButton.classList.add('delete-answer-btn');
      deleteAnswerButton.setAttribute('id', id);
      const editAnswerButton = document.createElement('i');
      editAnswerButton.setAttribute('class', 'fas');
      editAnswerButton.classList.add('fa-edit');
      editAnswerButton.classList.add('edit-answer-btn');
      editAnswerButton.setAttribute('id', id);
      console.log(deleteAnswerButton);
      newAnswerDiv.appendChild(deleteAnswerButton);
      deleteAnswerButton.addEventListener("click", async (e) => {
        newAnswerDiv.parentNode.removeChild(newAnswerDiv);
        await deleteItem("Answer", "answers", answerId);
      });
      newAnswerDiv.appendChild(editAnswerButton);
      newAnswerDiv.style.paddingBottom = "30px";
      const scoreBox = document.createElement('div');
      scoreBox.setAttribute('class', 'answer-score-text-box');
      const scorePara = document.createElement('p');
      scorePara.innerHTML = `Score: <span 'question-page-answer-score' id=A${answerId}-score>0</span>`
      scoreBox.appendChild(scorePara);
      newAnswerDiv.appendChild(scoreBox);
      const upvoteAnswerButton = document.createElement('i');
      upvoteAnswerButton.setAttribute('class', 'far');
      upvoteAnswerButton.classList.add('fa-caret-square-up');
      upvoteAnswerButton.classList.add('answer-upvote-arrow');
      upvoteAnswerButton.setAttribute('id', `A${answerId}-up`);
      newAnswerDiv.appendChild(upvoteAnswerButton);
      const downvoteAnswerButton = document.createElement('i');
      downvoteAnswerButton.setAttribute('class', 'far');
      downvoteAnswerButton.classList.add('fa-caret-square-down');
      downvoteAnswerButton.classList.add('answer-upvote-arrow');
      downvoteAnswerButton.setAttribute('id', `A${answerId}-down`);
      newAnswerDiv.appendChild(downvoteAnswerButton);
      upvoteAnswerButton.style.marginRight = "8px";
      upvoteAnswerButton.addEventListener("click", (e) => answerVote(1, e.target.id));
      downvoteAnswerButton.addEventListener("click", (e) => answerVote(2, e.target.id));
      document.querySelector(".answerQuestionForm").style.display = "none";
    });
  }

  if (deleteQuestion) {
    deleteQuestion.addEventListener("click", async (e) => {
      const target = e.target;
      const id = target.id;
      await deleteItem("Question", "questions", id, "/");
    });
  }

  if (deleteAnswers.length) {
    //console.log(deleteAnswers);
    // Use a for loop to add an event listener to each answer div
    for (let i = 0; i < deleteAnswers.length; i++) {
      deleteAnswers[i].addEventListener("click", async (e) => {
        const target = e.target;
        const id = target.id;
        console.log(deleteAnswers);
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


    if (reroute) window.location.href = reroute;
  } catch (err) {
    window.alert("error: " + err);
  }
};

async function postAnswer(route, answerTextBox) {
  textToSend = answerTextBox.value;

  try {
    const res = await fetch(`/${route}`, {
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

async function questionVote(upOrDownCode, questionId) {
  const upVoteQ = document.querySelector(".fa-caret-square-up");
  const downVoteQ = document.querySelector(".fa-caret-square-down");
  const score = document.querySelector(".question-page-question-score");

  if (upOrDownCode === 1 && upVoteQ.classList.contains("upvoted-arrow")) {
    try {
      await fetch(`/questions/${questionId}/vote`, {
        method: `DELETE`,
      });
    } catch (err) {
      console.log("question vote error", err);
    }
    upVoteQ.classList.remove("upvoted-arrow");
    score.innerText--;
    return;
  }

  if (upOrDownCode === 2 && downVoteQ.classList.contains("downvoted-arrow")) {
    try {
      await fetch(`/questions/${questionId}/vote`, {
        method: `DELETE`,
      });
    } catch (err) {
      console.log("question vote error", err);
    }
    downVoteQ.classList.remove("downvoted-arrow");
    score.innerText++;
    return;
  }

  try {
    if (
      downVoteQ.classList.contains("downvoted-arrow") ||
      upVoteQ.classList.contains("upvoted-arrow")
    ) {
      await fetch(`/questions/${questionId}/vote`, {
        method: `DELETE`,
      });
    }
    await fetch(
      `/questions/${questionId}/vote/${upOrDownCode}`,
      { method: `POST` }
    );

    if (upOrDownCode === 1) {
      score.innerText++;
      if (downVoteQ.classList.contains("downvoted-arrow")) score.innerText++;
      upVoteQ.classList.add("upvoted-arrow");
      downVoteQ.classList.remove("downvoted-arrow");
    } else {
      score.innerText--;
      if (upVoteQ.classList.contains("upvoted-arrow")) score.innerText--;
      downVoteQ.classList.add("downvoted-arrow");
      upVoteQ.classList.remove("upvoted-arrow");
    }
  } catch (err) {
    console.log("question vote error", err);
  }
}

async function answerVote(upOrDownCode, answerId) {

    answerId = answerId.slice(1);
    answerId = answerId.split('-')[0];
    const score = document.getElementById(`A${answerId}-score`)
    const upvoteButton = document.getElementById(`A${answerId}-up`);
    const downvoteButton = document.getElementById(`A${answerId}-down`);


    // previously voted
    if (upOrDownCode === 1 && upvoteButton.classList.contains("upvoted-arrow")) {
        try {
            await fetch(`/answers/${answerId}/vote`, {
                method: `DELETE`,
            });
        } catch (err) {
            console.log("question vote error", err);
        }
        upvoteButton.classList.remove("upvoted-arrow");
        score.innerText--;
        return;
    }

    // previously voted
    if (upOrDownCode === 2 && downvoteButton.classList.contains("downvoted-arrow")) {
        try {
            await fetch(`/answers/${answerId}/vote`, {
                method: `DELETE`,
            });
        } catch (err) {
            console.log("question vote error", err);
        }
        downvoteButton.classList.remove("downvoted-arrow");
        score.innerText++;
        return;
    }

    // fresh vote
    try {
        if (downvoteButton.classList.contains("downvoted-arrow") || upvoteButton.classList.contains("upvoted-arrow")) {
            await fetch(`/answers/${answerId}/vote`, {
                method: `DELETE`,
            });
        }
        await fetch(
            `/${answerId}/vote/${upOrDownCode}`,
            { method: `POST` }
        );

        if (upOrDownCode === 1) { //upvote
            if (downvoteButton.classList.contains("downvoted-arrow")) score.innerText++;
            score.innerText++;
            upvoteButton.classList.add("upvoted-arrow");
            downvoteButton.classList.remove("downvoted-arrow");
        } else { //downvote
            if (upvoteButton.classList.contains("upvoted-arrow")) score.innerText--;
            score.innerText--;
            downvoteButton.classList.add("downvoted-arrow");
            upvoteButton.classList.remove("upvoted-arrow");
        }

    } catch (err) {
        console.log("question vote error", err);
    }
}
