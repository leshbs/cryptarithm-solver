
let allSolutions = [];
let currentIndex = 0;

function solveCryptarithm() {
  const op1 = document.getElementById("operand1").value.toUpperCase().trim();
  const op2 = document.getElementById("operand2").value.toUpperCase().trim();
  const res = document.getElementById("result").value.toUpperCase().trim();
  const allowLeadingZero = document.querySelector(".allow-leading input").checked;
  const output = document.querySelector(".num-output");
  output.innerHTML = "";
  allSolutions = [];
  currentIndex = 0;

  if (!op1 || !op2 || !res) {
    output.innerHTML = "<p>⚠️ Semua kolom harus diisi.</p>";
    return;
  }

  const letters = Array.from(new Set((op1 + op2 + res).split("")));
  if (letters.length > 10) {
    output.innerHTML = "<p>⚠️ Huruf anda kebanyakan. Maksimal 10 huruf unik yang diperbolehkan.</p>";
    return;
  }

  const firstLetters = new Set([op1[0], op2[0], res[0]]);
  const permutations = getPermutations([...Array(10).keys()], letters.length);

  for (let perm of permutations) {
    const map = Object.fromEntries(letters.map((letter, i) => [letter, perm[i]]));
    if (!allowLeadingZero && [...firstLetters].some(ch => map[ch] === 0)) continue;

    const toNumber = word => Number(word.split("").map(ch => map[ch]).join(""));
    const num1 = toNumber(op1);
    const num2 = toNumber(op2);
    const resultNum = toNumber(res);

    if (num1 + num2 === resultNum) {
      allSolutions.push({ num1, num2, result: resultNum, map });
    }
  }

  if (allSolutions.length === 0) {
    output.innerHTML = "<p>&#128532 Tidak ditemukan solusi yang valid...</p>";
    return;
  }

  showNextSolutions(5);
}

function getPermutations(arr, k) {
  const result = [];

  function permute(path, used) {
    if (path.length === k) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(arr[i]);
      permute(path, used);
      path.pop();
      used[i] = false;
    }
  }

  permute([], Array(arr.length).fill(false));
  return result;
}

function showNextSolutions(count) {
  const output = document.querySelector(".num-output");

  // Remove old "more" button temporarily
  const oldMoreBtn = document.getElementById("more-btn");
  if (oldMoreBtn) oldMoreBtn.remove();

  for (let i = 0; i < count && currentIndex < allSolutions.length; i++, currentIndex++) {
    const { num1, num2, result, map } = allSolutions[currentIndex];

    const block = document.createElement("div");
    block.className = "solution-block";
    block.innerHTML = `
      <div class="solution-content">
          <div class="combo-title">Kombinasi ke- ${currentIndex + 1}</div>
          <div class="operand1"><h3>${num1}</h3></div>
          <div class="operand2"><h3>${num2}</h3></div>
          <div class="operator-symbol">
              <div class="line"></div>
              <div class="plus">+</div>
          </div>
          <div class="result"><h3>${result}</h3></div>
          <div class="mapping">
              ${Object.entries(map).map(([k, v]) => `${k} = ${v}`).join("; ")}
          </div>
      </div>
    `;
    output.appendChild(block);
  }

 
  if (currentIndex < allSolutions.length) {
    const moreBtn = document.createElement("button");
    moreBtn.id = "more-btn";
    moreBtn.textContent = "Show More...";
    moreBtn.style.marginTop = "1em";
    moreBtn.onclick = () => showNextSolutions(5);
    output.appendChild(moreBtn);
  }
}

function darkMode() {
  var body = document.body;
  var toLight = document.getElementById("to-light")
  var toDark = document.getElementById("to-dark")
  var creator = document.querySelectorAll(".creator")
  var lines = document.querySelectorAll(".line")
  var icons = document.querySelectorAll(".fab")
  var numOutput = document.querySelectorAll(".num-output")
  body.classList.toggle("dark-mode");
  toLight.classList.toggle("dark-mode");
  toDark.classList.toggle("dark-mode");
  creator.forEach(create => {
    create.classList.toggle('dark-mode');
  });
  lines.forEach(line => {
    line.classList.toggle('dark-mode');
  });
  icons.forEach(icon => {
    icon.classList.toggle('dark-mode');
  });
  numOutput.forEach(output => {
    output.classList.toggle('dark-mode');
  });
}

