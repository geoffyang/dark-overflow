window.addEventListener("DOMContentLoaded", async (event) => {
    console.log("hello from javascript!")

    const upVote = document.querySelector("#fa-caret-square-up")
    const downVote = document.querySelector("#fa-caret-square-down")

    upVote.addEventListener("click",  () => vote(1)

    downVote.addEventListener("click", () => vote(2))

    function vote(upOrDownCode) {
        //this questionVote route not yet built
        fetch(`http://localhost/questions/${id}/vote/${upOrDownCode}`)
    }
})
