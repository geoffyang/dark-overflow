window.addEventListener("DOMContentLoaded", async (event) => {
    console.log("hello from questions.js!")

    const upVoteQ = document.querySelector(".fa-caret-square-up")
    const downVoteQ = document.querySelector(".fa-caret-square-down")
    const upVoteQ = document.querySelector(".fa-caret-square-up")
    const downVoteQ = document.querySelector(".fa-caret-square-down")

    upVoteQ.addEventListener("click", e => vote(1, e.target.id));
    downVoteQ.addEventListener("click", e => vote(2, e.target.id));

})

async function vote(upOrDownCode, questionId) {
    try {
        await fetch(`http://localhost:8080/questions/${questionId}/vote`, { method: `DELETE` })
        await fetch(`http://localhost:8080/questions/${questionId}/vote/${upOrDownCode}`, { method: `POST` })

        //TBD add class to allow button visual reaction:
    }
    catch (err) { console.log("question vote error", err); };
}
