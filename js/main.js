var data = []
fetch('./data.json')
  .then(response => response.json())
  .then(data => fillData(data))
  .catch(error => console.log(error));


var currentProj = 0


function fillData(data) {

  document.getElementById('dev_name').innerHTML = data.info.name
  document.getElementById('dev_title').innerHTML = data.info.title
  document.getElementById('dev_bio').innerHTML = data.info.bio
  
  document.getElementById('dev_name1').innerHTML = data.info.name
  document.getElementById('dev_title1').innerHTML = data.info.title

  document.getElementById('codepen-link').href = data.info.links.codepen
  document.getElementById('github-link').href = data.info.links.github
  document.getElementById('linkedin-link').href = data.info.links.linkedin
  document.getElementById('email-link').href = data.info.links.email
  document.getElementById('stackoverflow-link').href = data.info.links.stackoverflow

  document.getElementById('codepen-link1').href = data.info.links.codepen
  document.getElementById('github-link1').href = data.info.links.github
  document.getElementById('linkedin-link1').href = data.info.links.linkedin
  document.getElementById('email-link1').href = data.info.links.email
  document.getElementById('stackoverflow-link1').href = data.info.links.stackoverflow

  var sections = data.sections
  var sectionBtnsParent = document.getElementById("section-btns")
  var key = Object.keys(sections)[0];

  Object.keys(sections).forEach((key, index) => {
        //fill section btns
        let sectionBtn = document.createElement("div")
        sectionBtn.classList.add("section-btn", "flex-center")
        let sectionInnerText = document.createElement("div")
        sectionInnerText.innerHTML = key
        sectionBtn.append(sectionInnerText)

        sectionBtn.addEventListener("click", () => {
         key = Object.keys(sections)[index]
         fillSections(data, key)
        })
        sectionBtnsParent.append(sectionBtn)
  })


  fillSections(data, key)


}

function fillSections(data, key) {
  var sections = data.sections

  var skillIconsParent = document.getElementById("skill-icons")
  skillIconsParent.innerHTML = ""
  var projectIconsParent = document.getElementById("project-icons")
  projectIconsParent.innerHTML = ""
  var projectParentDiv = document.getElementById("project-showcase")
  projectParentDiv.innerHTML = ""
  var experienceParentDiv = document.getElementById("expDiv")
  experienceParentDiv.innerHTML = ""

  
    var section = sections[key]

    //fill skills section
    for (var key_ of Object.keys(section["skills"])) {
      var skill = section["skills"][key_].name
      let skillImg = document.createElement("img")
      skillImg.src = `./programmingicons/${skill}.png`
      skillIconsParent.append(skillImg)
    }

    //fill experience section
    for (var key_ of Object.keys(section["experience"])) {
      var exp = section["experience"][key_]
      let expDiv = document.createElement("div")
      expDiv.classList.add('exp')
      let expName = document.createElement("div")
      expName.classList.add('exp-name')
      expName.innerHTML = exp.name
      let expDuration = document.createElement("div")
      expDuration.classList.add('exp-duration')
      expDuration.innerHTML = exp.time
      let expDescription = document.createElement("div")
      expDescription.classList.add('exp-description')    
      expDescription.innerHTML = exp.description

      expDiv.append(expName)
      expDiv.append(expDuration)
      expDiv.append(expDescription)

      expDiv.append(document.createElement("hr"))

      experienceParentDiv.append(expDiv)
    }

    //fill project thumbnail section
    for (var key_ of Object.keys(section["projects"])) {
      var project = section["projects"][key_]
      let projectImg = document.createElement("img")
      projectImg.src = `./images/${project.thumb}.png`
      projectImg.addEventListener('click', () => {
        console.log(key_);
      })
      projectIconsParent.append(projectImg)
    }

    //fill projects
    for (var key_ of Object.keys(section["projects"])) {
      var project = section["projects"][key_]

      var projectDiv = document.createElement("div")
      projectDiv.classList.add("project")

      var projectDivTitle = document.createElement("div")
      projectDivTitle.classList.add("project-name", "sub-title")
      projectDivTitle.innerHTML = project.name
      projectDiv.append(projectDivTitle)

      var projectDivDesc = document.createElement("div")
      projectDivDesc.classList.add("project-description")
      projectDivDesc.innerHTML = project.description
      projectDiv.append(projectDivDesc)

      var projectLinks = document.createElement("div")
      projectLinks.classList.add("project-links")

      if (project.url == "unavailable") {
        var projectLink1 = document.createElement("p")
        projectLink1.title = "unavailable, please contact me for more info"
      } else {
        var projectLink1 = document.createElement("a")
      }
      projectLink1.classList.add("link")
      projectLink1.href = project.url
      projectLink1.innerHTML = "Website"
      projectLinks.append(projectLink1)

      if (project.design == "unavailable") {
        var projectLink2 = document.createElement("p")
        projectLink2.title = "unavailable, please contact me for more info"
      } else {
        var projectLink2 = document.createElement("a")
      }
      projectLink2.classList.add("link")
      projectLink2.href = project.design
      projectLink2.innerHTML = "Design"
      projectLinks.append(projectLink2)

      if (project.code == "unavailable") {
        var projectLink3 = document.createElement("p")
        projectLink3.title = "unavailable, please contact me for more info"
      } else {
        var projectLink3 = document.createElement("a")
      }
      projectLink3.classList.add("link")
      projectLink3.href = project.code
      projectLink3.innerHTML = "Code"
      projectLinks.append(projectLink3)

      projectDiv.append(projectLinks)

      var projectScreenshots = document.createElement("div")
      projectScreenshots.classList.add("project-screenshots")

      project.images.forEach(img => {
        let img_ = document.createElement("img")
        img_.src = `./images/${img}.png`
        img_.addEventListener('click', ()=>{
          img_.classList.toggle("zoomed-img")
          document.getElementById("zoomed-img-bg").classList.toggle("hidden")
          document.body.classList.toggle("overflow-hidden")
        })
        projectScreenshots.append(img_)
      });

      projectDiv.style.display = "none"
      projectDiv.append(projectScreenshots)

      projectParentDiv.append(projectDiv)
    }

  initCarousel()
}

var projects = document.getElementsByClassName("project")

function initCarousel() {
  Array.from(projects).forEach((proj, index) => {
    if(index == currentProj) proj.style.display = "block"
    else proj.style.display = "none"
  })
  if (currentProj == projects.length - 1) {
    document.getElementById("next-btn").style.opacity = 0
    document.getElementById("next-btn").style.pointerEvents = "none"
  } else {
    document.getElementById("next-btn").style.opacity = 1
    document.getElementById("next-btn").style.pointerEvents = "all"
  }
  if (currentProj == 0) {
    document.getElementById("last-btn").style.opacity = 0
    document.getElementById("last-btn").style.pointerEvents = "none"
  } else {
    document.getElementById("last-btn").style.opacity = 1
    document.getElementById("last-btn").style.pointerEvents = "all"
  }
}

function nextProj() {
  currentProj++
  initCarousel()

}

function lastProj() {
  currentProj--
  initCarousel()

}