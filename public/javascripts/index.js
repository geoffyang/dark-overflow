window.addEventListener("DOMContentLoaded", async (event) => {
  console.log("hello from javascript!");

  const upVote = document.querySelector("#fa-caret-square-up");
  const downVote = document.querySelector("#fa-caret-square-down");

  // upVote.addEventListener("click", await (event) => {
  //     const voteType = 1
  // })

  // downVote.addEventListener("click", await (event) => {
  //     const voteType = 2
  // })

  // QUESTION PAGE DOM MANIPULATION
  // delete question
  const deleteQuestion = document.querySelector(".delete-question-btn");
  deleteQuestion.addEventListener("click", async (e) => {
    const target = e.target;
    const id = target.id;
    const res = await fetch(`/questions/${id}`, {
      method: "DELETE",
    });
  });



  // const answerButton = document.querySelector('#')
});
