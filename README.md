Responsive Portfolio Website
A modern, fully responsive, and feature-rich personal portfolio website built with HTML, CSS, and JavaScript. This project showcases a fictional developer's skills and projects in a visually appealing and interactive single-page application.

🌟 Key Features
Stunning Design: A clean, modern UI with a choice of dark and light themes to suit user preference.

Fully Responsive: Seamlessly adapts to any device, from mobile phones to high-resolution desktops.

Interactive Particle Background: A captivating animated background created with HTML5 Canvas that changes with the selected theme.

Dynamic Animations:

Smooth, scroll-triggered animations using the Intersection Observer API.

An eye-catching typing effect in the hero section.

Animated skill bars and statistic counters that activate when in view.

Dynamic Portfolio Grid:

Projects are loaded dynamically from a JavaScript array.

Live filtering allows users to sort projects by category (Web, Mobile, Design, AI/ML) with smooth transitions.

A modal window provides a detailed view for each project.

Client-Side Interactivity:

Smooth scrolling for navigation links with active state highlighting.

An automatic testimonial carousel with manual controls.

A functional contact form with real-time validation and a submission status indicator.

Enhanced User Experience:

A pre-loading screen ensures all content is ready before display.

A scroll progress bar indicates the user's position on the page.

A "Back to Top" button for easy navigation.

🛠 Tech Stack
This project is built from the ground up using core web technologies, without any frameworks or libraries for the main functionality.

Frontend:

HTML5: Semantic markup for structure and accessibility.

CSS3: Advanced styling, custom properties (variables) for theming, animations, and responsive design via media queries.

JavaScript (ES6+): Powers all dynamic content, interactivity, and DOM manipulation.

Assets & Libraries:

Font Awesome: For a wide range of high-quality icons.

Google Fonts: For the modern "Inter" typeface.

Unsplash: For placeholder imagery.

🚀 How to Run
No complex setup or build process is required!

Clone the repository:

git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)

Navigate to the project directory:

cd your-repo-name

Open the index.html file in your favorite web browser.

That's it! The website is fully self-contained and ready to go.

📄 Project Structure
While the final deployed version is a single index.html file for simplicity, the development structure was organized as follows:

portfolio-website/
├── index.html    # The main HTML file for content and structure
├── style.css     # All custom styles, theming, and responsive design
└── app.js        # All JavaScript logic and interactivity

🎨 Customization
Feel free to fork this repository and customize it for your own portfolio! Here are a few places to start:

app.js:

Update the portfolioData array with your own projects.

Modify the texts array in the initHeroAnimations function for the typing effect.

index.html:

Change the text content in all sections (About, Experience, Contact, etc.).

Update the social media and quick links in the footer.

style.css (or the <style> tag in index.html):

Adjust the CSS variables at the top of the file to change the color scheme, font
