function formatText() {
    const inputText = document.getElementById('inputText').value;
    const outputContainer = document.getElementById('outputContainer');
    const errorContainer = document.getElementById('errorContainer');
    outputContainer.innerHTML = ''; // Clear any previous output
    errorContainer.innerHTML = ''; // Clear any previous error message

    const lines = inputText.split(/ (?=#)/); // Split by spaces before a #
    let hasError = false;

    lines.forEach(line => {
        const match = line.match(/#(\d+) \((\d+)-(\d+)\) (N\d) (\d+)m (Ag|Cu)/);
        if (match) {
            const [_, id, num1, num2, N, meters, type] = match;
            const sortedNums = [num1, num2].sort((a, b) => a - b); // Sort numbers in ascending order
            const isChangedAndSorted = !(num1 === sortedNums[0] && num2 === sortedNums[1]);
            const formattedLine = `#${id} (${sortedNums[0]}-${sortedNums[1]}) ${N} ${meters}m ${type}`;
            const minNumber = sortedNums[0];

            const outputContainerRow = document.createElement('div');
            outputContainerRow.classList.add('outputContainerRow');

            const textArea = document.createElement('textarea');
            textArea.value = formattedLine;
            textArea.readOnly = true;
            textArea.classList.add('outputTextArea');
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = isChangedAndSorted;
            checkbox.disabled = true; // Make the checkbox read-only
            checkbox.classList.add('checkbox');

            const minNumberTextArea = document.createElement('textarea');
            minNumberTextArea.value = minNumber;
            minNumberTextArea.readOnly = true;
            minNumberTextArea.classList.add('minNumberTextArea');

            outputContainerRow.appendChild(textArea);
            outputContainerRow.appendChild(checkbox);
            outputContainerRow.appendChild(minNumberTextArea);
            outputContainer.appendChild(outputContainerRow);
        } else {
            hasError = true;
        }
    });

    if (hasError) {
        errorContainer.innerHTML = 'Error: Invalid or Incorrect input format. Please check your input.';
    }
}
