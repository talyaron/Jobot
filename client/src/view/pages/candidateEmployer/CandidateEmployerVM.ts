export default function useCandidateEmployer() {
    function onChat() {
        console.log("chat");
    }
    function onApprove() {
        console.log("Approved");
    }

    function onReject() {
        console.log("Rejected");
    }

    return {
        onChat,
        onApprove,
        onReject
    };
}