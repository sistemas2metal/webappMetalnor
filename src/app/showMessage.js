export function showMessage(message,type) {
    Toastify({
        text: message,
        duration: 2500,
        destination: "#",
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: type === "alert" ? "linear-gradient(to right,#FC3201,#FCFF2B)" : "linear-gradient(to right, #00b09b, #96c93d)"
        },
        onClick: function () { } // Callback after click
    }).showToast();
}
