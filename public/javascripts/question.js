window.addEventListener("DOMContentLoaded", async (event) => {
    console.log("hello from questions.js!")

    const upVote = document.querySelector(".fa-caret-square-up")
    const downVote = document.querySelector(".fa-caret-square-down")

    upVote.addEventListener("click", e => vote(1, e.target.id));
    downVote.addEventListener("click", e => vote(2, e.target.id));

})

async function vote(upOrDownCode, questionId) {
    try {
        await fetch(`http://localhost:8080/questions/${questionId}/vote`, { method: `DELETE` })
        await fetch(`http://localhost:8080/questions/${questionId}/vote/${upOrDownCode}`, { method: `POST` })

        //TBD add class to allow button visual reaction:
    }
    catch (err) { console.log("question vote error", err); };
}
