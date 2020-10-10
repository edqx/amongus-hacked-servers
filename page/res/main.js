function downloadFile() {
    const players = document.getElementById("players").value;
    const imposters = document.querySelector("input[name=imposters]:checked").value;
    const language = document.querySelector("input[name=language]:checked").value;
    const map = document.querySelector("input[name=map]:checked").value;
    const playerSpeed = document.getElementById("player-speed").value;
    const crewmateVision = document.getElementById("crewmate-vision").value;
    const imposterVision = document.getElementById("imposter-vision").value;
    const killCooldown = document.getElementById("kill-cooldown").value;
    const commonTasks = document.getElementById("common-tasks").value;
    const longTasks = document.getElementById("long-tasks").value;
    const shortTasks = document.getElementById("short-tasks").value;
    const emergencyMeetings = document.getElementById("emergency-meetings").value;
    const killDistance = document.querySelector("input[name=kill-distance]:checked").value;
    const discussionTime = document.getElementById("discussion-time").value;
    const votingTime = document.getElementById("voting-time").value;
    const emergencyCooldown = document.getElementById("emergency-cooldown").value;
    const confirmEjects = document.getElementById("confirm-ejects").value;
    const visualTasks = document.getElementById("visual-tasks").value;

    location.href = "/gameHostOptions?maxPlayers=" + players
        + "&imposters=" + imposters
        + "&language=" + language
        + "&map=" + map
        + "&playerSpeed=" + playerSpeed
        + "&crewmateVision=" + crewmateVision
        + "&imposterVision=" + imposterVision
        + "&killCooldown=" + killCooldown
        + "&commonTasks=" + commonTasks
        + "&longTasks=" + longTasks
        + "&shortTasks=" + shortTasks
        + "&emergencyMeetings=" + emergencyMeetings
        + "&killDistance=" + killDistance
        + "&discussionTime=" + discussionTime
        + "&votingTime=" + votingTime
        + "&emergencyCooldown=" + emergencyCooldown
        + "&confirmEjects=" + confirmEjects
        + "&visualTasks=" + visualTasks;
}

window.onload = function () {
    const inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];

        if (input.type === "number") {
            input.onkeyup = function () {
                if (parseFloat(this.value) < parseFloat(this.min)) {
                    this.value = this.min;
                }

                if (parseFloat(this.value) > parseFloat(this.max)) {
                    this.value = this.max;
                }
            }

            input.onchange = function () {
                if (!this.value) {
                    this.value = this.min;
                }
            }
        }
    }
}