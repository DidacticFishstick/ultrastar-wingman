function activate() {
    document.getElementById("main").classList.add("active");
    document.getElementById("logo").addEventListener("click", () => {
        document.getElementById("logo").classList.toggle("usdx");
    });
}
