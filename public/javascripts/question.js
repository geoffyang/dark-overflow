window.addEventListener("DOMContentLoaded", async (event) => {
  const upVoteQ = document.querySelector(".fa-caret-square-up");
  const downVoteQ = document.querySelector(".fa-caret-square-down");
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

  const upVoteA = document.querySelectorAll(".fa-plus-circle");
  const downVoteA = document.querySelectorAll(".fa-minus-circle");
  upVoteA.forEach((upVoteButton) => {
    upVoteButton.addEventListener("click", (e) => answerVote(1, e.target.id));
  });

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
      console.log("button click");
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
            `http://localhost:8080/askquestions/${questionId}`,
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
  answerQuestionButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const id = e.target.id;

    const answerId = await postAnswer(`answerquestion/${id}`, answerTextBox);

    const newAnswerDiv = document.createElement("div");

    newAnswerDiv.setAttribute("id", `answer=${answerId}`);

    newAnswerDiv.setAttribute("class", "answer-div");

    const newAnswerDelete = document.createElement("BUTTON");
    newAnswerDelete.innerHTML = "jasl;kdj";

    //NEED the answer DIV to have the same styling as the rest of them

    newAnswerDiv.innerHTML = answerTextBox.value;

    answerTextBox.value = "";

    answersDiv.appendChild(newAnswerDiv);
    newAnswerDiv.appendChild(newAnswerDelete);
    newAnswerDelete.setAttribute("class", "button");
    document.querySelector(".answerQuestionForm").style.display = "none";
  });

  if (deleteQuestion) {
    deleteQuestion.addEventListener("click", async (e) => {
      console.log("button clicked");
      const target = e.target;
      const id = target.id;
      await deleteItem("Question", "questions", id, "/");
    });
  }

  if (deleteAnswers.length) {
    // Use a for loop to add an event listener to each answer div

    console.log(`upvoteA array: ${upVoteA} length ${upVoteA.length}`);
    upVoteA.forEach((upVoteButton) => {
      upVoteButton.addEventListener("click", (e) => answerVote(1, e.target.id));
    });
    downVoteA.forEach((downVoteButton) => {
      downVoteButton.addEventListener("click", (e) =>
        answerVote(2, e.target.id)
      );
    });

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

async function questionVote(upOrDownCode, questionId) {
  const upVoteQ = document.querySelector(".fa-caret-square-up");
  const downVoteQ = document.querySelector(".fa-caret-square-down");
  const score = document.querySelector(".question-page-question-score");

  if (upOrDownCode === 1 && upVoteQ.classList.contains("upvoted-arrow")) {
    try {
      await fetch(`http://localhost:8080/questions/${questionId}/vote`, {
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
      await fetch(`http://localhost:8080/questions/${questionId}/vote`, {
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
      await fetch(`http://localhost:8080/questions/${questionId}/vote`, {
        method: `DELETE`,
      });
    }
    await fetch(
      `http://localhost:8080/questions/${questionId}/vote/${upOrDownCode}`,
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
  const score = document.querySelector(
    `${answerId}.question-page-answer-score`
  );
  const upvoteButton = document.querySelector(`${answerId}.fa-plus-circle`);
  const downvoteButton = document.querySelector(`${answerId}.fa-minus-circle`);

  //answerId has an 'A' prefix that needs to be removed
  answerId = answerId.slice(1);

  // // previously voted
  // if (upOrDownCode === 1 && upVoteQ.classList.contains("upvoted-arrow")) {
  //     try {
  //         await fetch(`http://localhost:8080/answers/${answerId}/vote`, {
  //             method: `DELETE`,
  //         });
  //     } catch (err) {
  //         console.log("question vote error", err);
  //     }
  //     upVoteQ.classList.remove("upvoted-arrow");
  //     score.innerText--;
  //     return;
  // }

  // // previously voted
  // if (upOrDownCode === 2 && downVoteQ.classList.contains("downvoted-arrow")) {
  //     try {
  //         await fetch(`http://localhost:8080/answers/${answerId}/vote`, {
  //             method: `DELETE`,
  //         });
  //     } catch (err) {
  //         console.log("question vote error", err);
  //     }
  //     downVoteQ.classList.remove("downvoted-arrow");
  //     score.innerText++;
  //     return;
  // }

  // fresh vote
  try {
    await fetch(`http://localhost:8080/answers/${answerId}/vote`, {
      method: `DELETE`,
    });
    await fetch(
      `http://localhost:8080/answers/${answerId}/vote/${upOrDownCode}`,
      { method: `POST` }
    );

    if (upOrDownCode === 1) {
      //upvote
      if (downvoteButton.classList.contains("downvoted-arrow"))
        score.innerText++;
      upvoteButton.classList.add("upvoted-arrow");
      downvoteButton.classList.remove("downvoted-arrow");
    } else {
      //downvote
      if (upvoteButton.classList.contains("upvoted-arrow")) score.innerText--;
      downvoteButton.classList.add("downvoted-arrow");
      upvoteButton.classList.remove("upvoted-arrow");
    }
  } catch (err) {
    console.log("question vote error", err);
  }
}
