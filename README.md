# DJ-Comps-Skill-Finder
An application to find people with similar interests as you on the campus.

## Instructions to setup
- git clone https://github.com/djunicode/DJ-Comps-Skill-Finder.git
- cd DJ-Comps-Skill-Finder
- virtualenv env --no-site-packages
- source env/bin/activate
- pip install -r requirements.txt
- Create a postgres db and add the credentials to settings.py
- python manage.py makemigrations
- python manage.py migrate
- npm install
- ./node_modules/.bin/webpack --config webpack.config.js
- python manage.py runserver

## Motivation
The general approach of finding people with similar interests as you can be time consuming as there is a need to first talk to people and then filter the ones that are interested to work in the same domain as you. This applications aims to resolve the time consuming process and rather daunting process of approaching seniors/ peers by automatically matching up people who have interests in similar domain.

## What can we better
- Lack of interaction between seniors and juniors
- Absence of an open platform where you can show and see what you are interested in. 
- The struggle to find potential partners for hackathons and projects.

## Who is the audience
- Newly joined SEs, seeking answers to all kind of questions
- TEs/BEs who would help juniors in their area of interest
- Any student seeking team members for a project/hackathon
- Any student wishing to contact students whose skills match his/her interests.


## Problems we aim to tackle
- **Lack of downward information flow**
    Seniors have experience of working in the field which their juniors might lack. Most colleges lack this downward flow of information where in a senior can act as a mentor to a particular junior guiding him/her towards his/her goal in the respective domain. This eliminates the time spent in trial error by the junior in order to get on the right path.
- **Forming teams for Hackathons & Projects**
    Every hackathon brings a different set of challenges which requires the team to have members with grasp of the required tech. The process of finding such specific people having expertize in a particular field can be made easy by this application. Additionally, juniors can apply for vancancies in teams formed by seniors. The seniors can evaluate these applications on the basis of the resume and select the desired candidate.
- **Listing of upcoming events**
    Events such as hackathons, coding competitions are conducted at various places around the year. People who are aware about any such event can notify other users of the application by posting about the event.

## Features Overview

- **Find a mentor**	
A student may request a senior to mentor him/her in a particular programming	language/skill.
- **Match a Mentor**
Similarly, a student may choose to mentor others in whichever skills he is proficient in.
- **Find a team for Hackathons/Projects**
- **Find team members based on skills.**
- **Post new Hackathons**

## Future Prospects
- Chat Room System to serve as a in-platform communication between seniors who are currently mentoring juniors, and for discussions within peer groups based on skills/interests. 
- Integrate with Information portal and android app


## Our Team

### Team Leader
Avais Pagarkar

### TE Mentors
Aakash Shah, Ikbal Singh, Krisha Mehta, Vatsal Doshi

### Front End Developers
Devansh Dalal, Jinesh Shah, Mudra Nagda, Viral Tagdiwala

### Back End Developers
Parth Doshi, Pratik Mulchandani, Parth Shah
