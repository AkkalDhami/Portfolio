let skills = [
  {
    image: "../assets/image/html.png",
    image2: "../assets/image/html-dark.png",
    title: "HTML5",
    duration: "1400",
    color: "#e34f26",
    icon: '<i class="fab fa-html5 text-[#e34f26] text-4xl sm:text-5xl"></i>',
  },
  {
    image: "../assets/image/css.png",
    image2: "../assets/image/css-dark.png",
    title: "CSS3",
    duration: "1800",
    color: "#2965f1",
    icon: '<i class="fab fa-css3-alt text-[#2965f1] text-4xl sm:text-5xl"></i>',
  },
  {
    image: "../assets/image/js.png",
    image2: "../assets/image/js-dark.png",
    title: "JavaScript",
    duration: "2200",
    color: "#f7df1e",
    icon: '<i class="fab fa-js text-[#f7df1e] text-4xl sm:text-5xl"></i>',
  },
  {
    image: "../assets/image/tailwind.png",
    image2: "../assets/image/tailwind-dark.png",
    title: "Tailwind CSS",
    duration: "2600",
    color: "#029db0",
    icon: '<img src="../assets/image/tailwindcss.png" alt="tailwind logo">',
  },
  {
    image: "../assets/image/tailwind.png",
    image2: "../assets/image/tailwind-dark.png",
    title: "VS Code",
    duration: "1400",
    color: "#229adc",
    icon: ' <img src="../assets/image/vscode.svg" class="w-[40px]" alt="tailwind logo" />',
  },
  {
    image: "../assets/image/githubcommits.png",
    image2: "../assets/image/githubcommits-dark.png",
    title: "Git",
    duration: "1800",
    color: "#dd4a1d",
    icon: '<img src="../assets/image/icons8-git-48.png" class="w-[60px]" alt="git logo" />',
  },
  {
    image: "../assets/image/githubcommits.png",
    image2: "../assets/image/githubcommits-dark.png",
    title: "Github",
    duration: "2200",
    color: "#dd4a1d",
    icon: '<img src="../assets/image/icons8-github-32.png" class="w-[60px]" alt="github logo" />',
  },
  {
    image: "../assets/image/node.png",
    image2: "../assets/image/node-dark.png",
    title: "Node.js",
    duration: "2600",
    color: "#339933",
    icon: ' <i class="fab fab fa-node-js text-[#339933] text-5xl"></i>',
  },
  {
    image: "../assets/image/express.png",
    image2: "../assets/image/express-dark.png",
    title: "Express.js",
    duration: "1600",
    color: "#fff",
    icon: '<img src="../assets/image/expressLoggo.png" alt="expressjs logo"/>',
  },
  {
    image: "../assets/image/mongo.png",
    image2: "../assets/image/mongo.png",
    title: '<span class="text-blue-400">My</span><span class="text-orange-500">SQL</span>',
    duration: "3400",
    color: "#f97316",
    icon: '<img src="./assets/image/logo-mysq.png" class="w-[60px]" alt="monogdbLogo logo" />',
  },
  {
    image: "../assets/image/mongo.png",
    image2: "../assets/image/mongo.png",
    title: 'MongoDB',
    duration: "3800",
    color: "#0ecf45",
    icon: '<img src="../assets/image/MongoDB_Logomark_SpringGreen.png" class="w-[30px]" alt="monogdbLogo logo" />',
  },
  {
    image: "../assets/image/mongo.png",
    image2: "../assets/image/mongo.png",
    title: 'Postman',
    duration: "4200",
    color: "#f37036",
    icon: '<img src="../assets/image/Postman.svg" class="w-[60px]" alt="postman logo" />',
  },
];

let skillsContainer = document.getElementById("skillsContainer");
skills.forEach((skill) => {
  let skillCard = `
  <div data-aos="fade-up" data-aos-duration="${skill.duration}" class="skill-card h-[220px] bg-white dark:bg-gray-700 p-6 rounded-md flex items-center justify-center flex-col bg-[url('${skill?.image2}')] dark:bg-[url('${skill?.image}')]  bg-cover bg-left-top bg-no-repeat relative group overflow-hidden">
  <div class="absolute inset-0 bg-black opacity-[0.3]"></div>
  <div class="language-icon relative flex items-center justify-center z-10 w-[80px] h-[80px]  sm:w-[90px] sm:h-[90px] rounded-full dark:bg-[#4e4848] bg-[#fffffff2]  group-hover:scale-105 opacity-100 transition-all">
  ${skill.icon} 
  </div>
  <h3 class="text-xl bg-[#ffffff] dark:bg-[#4e4848] border-[1.8px] border-[${skill.color}] px-[0.6rem] py-[0.1rem] rounded-[1.5rem]  relative z-50 mt-6 text-[${skill.title === 'Express.js' ? '#000' : skill.color}] dark:text-[${skill.title === 'Express.js' ? '#fff' : skill.color}] font-bold">
  ${skill.title}
  </h3>
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
