const screens = {
  intro: document.querySelector("#screen-intro"),
  quiz: document.querySelector("#screen-quiz"),
  loading: document.querySelector("#screen-loading"),
  final: document.querySelector("#screen-final"),
};

const totalSteps = 5;
const answers = {
  empresa: "",
  solucao: "",
  nicho: "",
  desafio: "",
  objetivos: [],
};

const showScreen = (name) => {
  Object.values(screens).forEach((screen) => screen.classList.remove("active"));
  screens[name].classList.add("active");
  window.scrollTo({ top: 0, behavior: "instant" });
};

const showStep = (stepNumber) => {
  document.querySelectorAll(".step").forEach((step) => {
    step.classList.toggle("active", step.dataset.step === String(stepNumber));
  });
  const percent = Math.round((stepNumber / totalSteps) * 100);
  document.querySelector("#progressLabel").textContent = `Pergunta ${stepNumber} de ${totalSteps}`;
  document.querySelector("#progressPercent").textContent = `${percent}%`;
  document.querySelector("#progressFill").style.width = `${percent}%`;
};

const collectInputs = () => {
  answers.empresa = document.querySelector("#q-empresa").value.trim();
  answers.nicho = document.querySelector("#q-nicho").value.trim();
  answers.desafio = document.querySelector("#q-desafio").value.trim();
};

const getMessage = () => {
  collectInputs();
  return [
    "Oi Caio, quero conversar sobre um projeto com a Aspecto.",
    "",
    `Empresa ou projeto: ${answers.empresa || "Não informado"}`,
    `Solução procurada: ${answers.solucao || "Não informado"}`,
    `Segmento: ${answers.nicho || "Não informado"}`,
    `Desafio atual: ${answers.desafio || "Não informado"}`,
    `Objetivos: ${answers.objetivos.length ? answers.objetivos.join(", ") : "Não informado"}`,
  ].join("\n");
};

const openWhatsApp = () => {
  const url = `https://wa.me/5511975362312?text=${encodeURIComponent(getMessage())}`;
  window.open(url, "_blank", "noreferrer");
};

document.querySelectorAll(".js-start-quiz").forEach((button) => {
  button.addEventListener("click", () => {
    showScreen("quiz");
    showStep(1);
  });
});

document.querySelector("#homeButton").addEventListener("click", () => {
  showScreen("intro");
  window.location.hash = "inicio";
});

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => {
    collectInputs();
    showStep(Number(button.dataset.go));
  });
});

document.querySelectorAll(".options").forEach((group) => {
  const name = group.dataset.name;
  const isMulti = group.classList.contains("multi");
  group.querySelectorAll(".option").forEach((option) => {
    option.addEventListener("click", () => {
      if (isMulti) {
        option.classList.toggle("selected");
        answers[name] = [...group.querySelectorAll(".option.selected")].map((item) => item.dataset.value);
        return;
      }
      group.querySelectorAll(".option").forEach((item) => item.classList.remove("selected"));
      option.classList.add("selected");
      answers[name] = option.dataset.value;
    });
  });
});

document.querySelector("#finishBtn").addEventListener("click", openWhatsApp);
document.querySelector("#finalWhatsBtn").addEventListener("click", openWhatsApp);
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelectorAll("video").forEach((video) => { video.playbackRate = 0.82; });
