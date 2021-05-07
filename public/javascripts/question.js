window.addEventListener("DOMContentLoaded", async (event) => {
    console.log("hello from questions.js!");

    const upVoteQ = document.querySelector(".fa-caret-square-up")
    const downVoteQ = document.querySelector(".fa-caret-square-down")
    const upVoteA = document.querySelector(".fa-caret-square-up")
    const downVoteA = document.querySelector(".fa-caret-square-down")
    const deleteQuestion = document.querySelector(".delete-question-btn");

    upVoteQ.addEventListener("click", e => vote(1, e.target.id));
    downVoteQ.addEventListener("click", e => vote(2, e.target.id));
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
        window.location.href = "http://localhost:8080/";
    } catch (err) {
        window.alert("error: " + err);
    }
};

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
