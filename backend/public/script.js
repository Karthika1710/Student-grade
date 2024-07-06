document.getElementById('gradeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const subject1 = parseInt(formData.get('subject1'));
    const subject2 = parseInt(formData.get('subject2'));
    const subject3 = parseInt(formData.get('subject3'));
    const subject4 = parseInt(formData.get('subject4'));
    const subject5 = parseInt(formData.get('subject5'));

    // Calculate total marks
    const totalMarks = subject1 + subject2 + subject3 + subject4 + subject5;

    // Calculate grade
    let grade;
    if (totalMarks >= 400) {
        grade = 'A';
    } else if (totalMarks >= 300) {
        grade = 'B';
    } else if (totalMarks >= 200) {
        grade = 'C';
    } else if (totalMarks >= 100) {
        grade = 'D';
    } else {
        grade = 'E';
    }

    // Display result
    const resultElement = document.getElementById('result');
    resultElement.textContent = `${name}'s Total Marks: ${totalMarks}, Grade: ${grade}`;
    resultElement.style.display = 'block';
});
