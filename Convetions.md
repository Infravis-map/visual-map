## Branches
The branch structure for this project is the following. Ordered from top to bottom, depending on importance.

main - The main branch shall always be in a functional state. It's protected from pushes, only merging can be done.

dev - The branch that merges all sub-branches. Only one branch on this layer. When in a good state this branch shall be merged to main.

issue - For each issue a new branch is created to deal with that issue. It's then merged to dev. It should be named so: `issue/<issue-number>-<issue-name>`.

## Project standards
When working on issues include the issue number. Pull-requests should be always be created on a new branch with the branch named after the issue. If the issue is (#9 "Do this"), then the branch shall be named "issue/9-do-this". If you want to create a new branch for an issue that already exists, add a -2 to the end. "issue/9-do-this-2", and so on.  
Issues should have a short but descriptive title with a longer description describing the issue. Title should be in future tense.

Create a new branch with `git switch -c <branch-name>`. The `-c` flag creates a new branch.

Incase you want to make a sub-branch of an issue-branch name that branch "issue/feature/9-do-this".

Merge's are supposed to be done by the assigne.