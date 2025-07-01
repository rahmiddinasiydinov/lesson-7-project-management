import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectState, setProjectState] = useState({
    selectedProject: undefined,
    projects: [],
    tasks: []
  })

  function handleSelectProject(id) {
    setProjectState(prevProject => {
      return { ...prevProject, selectedProject: id }
    })
  }
  function handleStartAddProject() {
    setProjectState(prevProject => {
      return { ...prevProject, selectedProject: null }
    })
  }

  function handleCancelAddProject() {
    setProjectState(prevProject => {
      return { ...prevProject, selectedProject: undefined }
    })
  }



  function handleAddProject(projectData) {
    setProjectState(prevProject => {
      const projectId = Math.random()
      const newProject = {
        ...projectData,
        id: projectId
      }
      return {
        ...prevProject,
        selectedProject: undefined,
        projects: [...prevProject.projects, newProject]
      }
    })
  }

  console.log(projectState);
  

  function handleProjectDelete() {
    setProjectState(prevProject => {
      return {
        ...prevProject,
        selectedProject: undefined,
        projects: prevProject.projects.filter(project => project.id !== prevProject.selectedProject)
      }
    })
  }

  function handleAddTask(text) {
    setProjectState(prevProject => {
      const taskId = Math.random()
      const newTask = {
        text,
        projectId: prevProject.selectedProject,
        id: taskId
      }
      return {
        ...prevProject,
        tasks: [newTask, ...prevProject.tasks,]
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectState(prevProject => {
      return {
        ...prevProject,
        tasks: prevProject.tasks.filter(task => task.id !== id)
      }
    })
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProject);

  const selectedProjectTasks = projectState.tasks.filter(task => task.projectId === projectState.selectedProject)
  let content = <SelectedProject
    project={selectedProject}
    onDelete={handleProjectDelete}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={selectedProjectTasks}
  />;
  if (projectState.selectedProject === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if (projectState.selectedProject === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProject}
      />
      {content}
    </main>
  );
}

export default App;
