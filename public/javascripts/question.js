window.addEventListener("DOMContentLoaded", async (event) => {
    console.log("hello from questions.js!");

    const upVoteQ = document.querySelector(".fa-caret-square-up")
    const downVoteQ = document.querySelector(".fa-caret-square-down")
    const upVoteA = document.querySelectorAll(".fa-plus-circle")
    const downVoteA = document.querySelectorAll(".fa-minus-circle")
    // const deleteQuestion = document.querySelector(".delete-question-btn");

    upVoteQ.addEventListener("click", e => vote("questions", 1, e.target.id));
    downVoteQ.addEventListener("click", e => vote("questions", 2, e.target.id));
    upVoteA.forEach(upVote => upVote.addEventListener("click", e => vote("answers", 1, e.target.id)))
    downVoteA.forEach(downVote => downVote.addEventListener("click", e => vote("answers", 2, e.target.id)))
    // deleteQuestion.addEventListener("click", async (e) => {
    //     const target = e.target;
    //     const id = target.id;
    //     await deleteItem("question", "questions", id, "");
    // });
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

async function vote(voteOnQuestionsOrAnswers, upOrDownCode, questionOrAnswerID) {
    try {
        // DELETE questions/:id(\\d+)/vote/:votetype(\\d+)
        // DELETE answers/:id(\\d+)/vote/:votetype(\\d+)
        await fetch(`http://localhost:8080/${voteOnQuestionsOrAnswers}/${questionOrAnswerID}/vote`, {
            method: `DELETE`,
        });
        await fetch(
            `http://localhost:8080/${voteOnQuestionsOrAnswers}/${questionOrAnswerID}/vote/${upOrDownCode}`,
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
