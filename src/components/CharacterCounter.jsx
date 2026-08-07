function CharacterCounter({ currentLength, maxLength }) {
    const remaining = maxLength - currentLength;

    let counterClass = "counter";

    if (remaining <= 20 && remaining >= 0) {
        counterClass += " warning";
    }

    if (remaining < 0) {
        counterClass += " danger";
    }

    return (
        <div className={counterClass}>
            <span>
                {currentLength} / {maxLength}
            </span>

            <span>
                {remaining >= 0
                    ? `${remaining} characters remaining`
                    : `${Math.abs(remaining)} characters over limit`}
            </span>
        </div>
    );
}

export default CharacterCounter;