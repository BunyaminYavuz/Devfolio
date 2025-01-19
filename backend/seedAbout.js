require('dotenv').config();

const mongoose = require('mongoose');
const About = require('./models/About');

const aboutData = {
    title: "About Me",
    description: `
        Hi! I'm Bunyamin Yavuz, a Full Stack Developer with expertise in both backend and frontend technologies.
        I specialize in developing scalable and user-friendly web applications using modern technologies. My skillset
        includes Python, C#, JavaScript, and TypeScript, along with experience in database management (PostgreSQL, 
        MongoDB, SQL Server, Snowflake) and cloud services (AWS, Docker). I'm passionate about data science and machine 
        learning, with experience in TensorFlow, Keras, and Scikit-learn.
    `,
    contactLinks: [
        "mailto:yavuzzbunyamin@gmail.com",
        "https://github.com/BunyaminYavuz",
        "https://linkedin.com/in/bunyaminyavuz",
        "https://kaggle.com/bunyaminyavuz"
    ],
    skills: [
        {
            category: "Programming Languages",
            skills: ["Python", "C#", "SQL", "JavaScript", "TypeScript"]
        },
        {
            category: "Backend Development",
            skills: [".NET Framework", "Node.js", "RESTful API Development", "JWT", "OAuth"]
        },
        {
            category: "Database Management",
            skills: ["PostgreSQL", "MongoDB", "SQL Server", "Snowflake", "Redis", "SAP Data Services"]
        },
        {
            category: "Data Science & Machine Learning",
            skills: ["NumPy", "Pandas", "Scikit-learn", "TensorFlow", "Keras", "Matplotlib", "OpenCV"]
        },
        {
            category: "DevOps & Tools",
            skills: ["Git", "Docker", "AWS (EC2, S3, IAM...)", "Linux", "Control-M", "Autosys", "SSMS"]
        },
        {
            category: "Machine Learning Techniques",
            skills: ["Supervised Learning", "Unsupervised Learning", "Deep Learning", "Feature Engineering", "Model Evaluation & Optimization"]
        },
        {
            category: "Soft Skills",
            skills: ["Problem-Solving", "Research", "Team Collaboration", "Communication", "Adaptability", "Leadership"]
        },
        {
            category: "Languages",
            skills: ["Turkish (Native)", "English (Full Professional Proficiency)", "German (Beginner Level)"]
        }
    ],
    experience: `
        • Data Warehouse Specialist - Inspire IT (Jun 2024 – Present)
        • Database & System Management Intern - Inspire IT (Jul 2024 – Sep 2024)
        • Software Developer Intern - Inspire IT (Jul 2024 – Sep 2024)
    `,
    education: `
        • B.Sc. in Computer Engineering - Alanya Alaaddin Keykubat University (Sep 2020 – Jun 2025)
        • High School Diploma - Alanya High School (Sep 2016 – Jun 2020) – Graduated as the top student
    `
};

const seedAbout = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { // Update with your DB connection string
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        const existingAbout = await About.findOne();
        if (!existingAbout) {
            const about = new About(aboutData);
            await about.save();
            console.log('About data seeded successfully!');
        } else {
            console.log('About data already exists. Skipping seed.');
        }
    } catch (error) {
        console.error('Error seeding About data:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedAbout(); 