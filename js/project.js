let skills = [
  {
    image: "../assets/image/html.png",
    title: "HTML5",
    color: "#e34f26",
    icon: '<i class="fab fa-html5 text-[#e34f26] text-4xl sm:text-5xl"></i>',
  },
  {
    image: "../assets/image/css.png",
    title: "CSS3",
    color: "#2965f1",
    icon: '<i class="fab fa-css3-alt text-[#2965f1] text-4xl sm:text-5xl"></i>',
  },
  {
    image: "../assets/image/js.png",
    title: "JavaScript",
    color: "#f7df1e",
    icon: '<i class="fab fa-js text-[#f7df1e] text-4xl sm:text-5xl"></i>',
  },
  {
    image: "../assets/image/tailwind.png",
    title: "Tailwind CSS",
    color: "#029db0",
    icon: '<img src="../assets/image/tailwindcss.png" alt="tailwind logo">',
  },
  {
    image: "../assets/image/tailwind.png",
    title: "VS Code",
    color: "#229adc",
    icon: ' <img src="../assets/image/vscode.svg" class="w-[40px]" alt="tailwind logo" />',
  },
  {
    image: "../assets/image/githubcommits.png",
    title: "Git",
    color: "#dd4a1d",
    icon: '<img src="../assets/image/icons8-git-48.png" class="w-[60px]" alt="git logo" />',
  },
  {
    image: "../assets/image/githubcommits.png",
    title: "Github",
    color: "#dd4a1d",
    icon: '<img src="../assets/image/icons8-github-32.png" class="w-[60px]" alt="github logo" />',
  },
  {
    image: "../assets/image/node.png",
    title: "Node.js",
    color: "#339933",
    icon: ' <i class="fab fab fa-node-js text-[#339933] text-5xl"></i>',
  },
  {
    image: "../assets/image/express.png",
    title: "Express.js",
    color: "#fff",
    icon: '<img src="../assets/image/expressLoggo.png" alt="expressjs logo"/>',
  },
  {
    image: "../assets/image/mongo.png",
    title: '<span class="text-blue-400">My</span><span class="text-orange-500">SQL</span>',
    color: "",
    icon: '<img src="./assets/image/logo-mysq.png" class="w-[60px]" alt="monogdbLogo logo" />',
  },
  {
    image: "../assets/image/mongo.png",
    title: 'MongoDB',
    color: "#0ecf45",
    icon: '<img src="../assets/image/MongoDB_Logomark_SpringGreen.png" class="w-[30px]" alt="monogdbLogo logo" />',
  },
  {
    image: "../assets/image/mongo.png",
    title: 'Postman',
    color: "#f37036",
    icon: '<img src="../assets/image/postman.svg" class="w-[60px]" alt="monogdbLogo logo" />',
  },
];

let skillsContainer = document.getElementById("skillsContainer");
skills.forEach((skill) => {
  let skillCard = `
  <div class="skill-card h-[220px] bg-white dark:bg-gray-700 p-6 rounded-md flex items-center justify-center flex-col bg-[url('${skill.image}')] bg-cover bg-left-top bg-no-repeat relative group overflow-hidden">
  <div class="absolute inset-0 bg-black opacity-50"></div>
  <div class="language-icon relative flex items-center justify-center z-10 w-[80px] h-[80px]  sm:w-[90px] sm:h-[90px] rounded-full dark:bg-[#4e4848] bg-[#ffffff] group-hover:scale-105 opacity-90 transition-all">
  ${skill.icon} 
  </div>
  <h3 class="text-xl relative z-40 mt-6 text-[${skill.color}] font-bold">${skill.title}</h3>
</div>
  `;
  skillsContainer.insertAdjacentHTML("beforeend", skillCard);
});




const about = [
  {
    description:
      "Passionate about crafting exceptional digital experiences through clean code and innovative solutions. Let's turn your ideas into reality.",

    skills: {
      frontend: ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS'],
      backend: ['Node.js', 'Express.js'],
      database: ['MongoDB', 'MySQL'],
    },

    toolsIused: {
      'code editor': ['VS Code', 'Windsurf', 'Cursor'],
      'version control': ['git', 'github'],
      'API testing': ['postman'],
    },

    experience: {
      '2020 - Present': 'Senior Developer',
      '2018 - 2020': 'Full Stack Developer',
    },

    education: {
      '2020 - 2024': "Bachelor's in Computer Science",
    },
  },
];
