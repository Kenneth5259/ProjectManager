This is the README for the Project Management Application that began development during COVID-19 related unemployment.

It serves as good practice and a practical tool for me to use for other projects.

Current setup uses the following technologies:
    -React Front End
        -Axios for http requests
        -All Components written from scratch. Opted to not use Redux at this time for state management.
    -Node Backend
        -Express JS
        -Mongoose for DB access and models
        -PassportJS for Authenticating Users *TO BE ADDED
    -MongoDB

The Application currently allows for multiple projects to be created and stored, each with its own series of categories for tasks, individual tasks, and the progress of those tasks.
The first major function is to serve as a virtual SCRUM board. 

GOALS:
    - Functioning SCRUM Board (IN PROGRESS)
        - Fully droppable tasks
        - Task backlog visibiliy
        - Custom columns
            - Custom columns rearrangeable *TO BE ADDED
            - Custom Columns Deleteable *TO BE ADDED
            - Custom Columns Editable
        -Custom Tasks
            - Title
            - Description
            - Category w/ Color Matching
            - Requirement Number *TO BE ADDED
            - Task Editing (Any above fields) *TO BE ADDED
            - Task Deletion for accidental creation
            - Task Completion for backlogging
        - Custom Categories
            - Title
            - Stored Color
            - Completion *TO BE ADDED
            - Deletion *TO BE ADDED

    - Functioning Backlog *TO BE ADDED
        - Shows every completed category and tasks
        - Allows for viewinging on complete requirements, and corresponding user who completed the task
        - Visibility on dates for completion and modification on tasks/categories

    - Requirements Management System *TO BE ADDED
        - Create Requirement
            - Title
            - Description
            - Incrementing Requirement Number
            - Parent Requirement(s)
                - Categories may have requirements which are inherited by every task under the category
        - Edit Requirement
            - See all above properties of Create Requirement
        - Delete Requirement
            - See all above properties of Create Requirement
    
    - User Management System * TO BE ADDED
    