const getAgeGroup = (age) => {
    if (age >= 17 && age <= 21) return "17-21";
    if (age >= 22 && age <= 26) return "22-26";
    if (age >= 27 && age <= 31) return "27-31";
    if (age >= 32 && age <= 36) return "32-36";
    if (age >= 37 && age <= 41) return "37-41";
    if (age >= 42 && age <= 46) return "42-46";
    if (age >= 47 && age <= 51) return "47-51";
    if (age >= 52 && age <= 56) return "52-56";
    if (age >= 57 && age <= 61) return "57-61";
    return "62+";
  };
  
  const calculateDeadliftScore = (gender, age, deadlift, testScore) => {
    if (!gender || !testScore[gender]) {
      return 0;
    }
    const ageGroup = getAgeGroup(age);
    const deadliftScores = testScore[gender]["max-dead-lift"];
    let score = 0;
  
    for (let weight in deadliftScores) {
      if (deadlift >= weight) {
        score = deadliftScores[weight][0][ageGroup];
      }
    }
    return score || 0;
  };
  
  const calculatePowerThrowScore = (gender, age, powerThrow, testScore) => {
    if (!gender || !testScore[gender]) {
      return 0; // Return 0 or an appropriate default value when gender is not selected
    }
  
    const ageGroup = getAgeGroup(age);
    const powerThrowScores = testScore[gender]["standing-power-throw"];
    let score = 0;
  
    // Convert powerThrow to a whole number for comparison
    const roundedPowerThrow = Math.floor(powerThrow * 10); // Multiplying by 10 to work with whole numbers (e.g., 8.7 -> 87)
  
    // Find the nearest power throw distance in the JSON data
    for (let distance in powerThrowScores) {
      if (roundedPowerThrow >= distance) {
        score = powerThrowScores[distance][0][ageGroup];
      } else {
        break; // Break out of the loop once the next distance is higher than the roundedPowerThrow
      }
    }
  
    return score || 0;
  };
  
  const calculatePushUpsScore = (gender, age, pushUps, testScore) => {
    if (!gender || !testScore[gender]) {
      return 0;
    }
    const ageGroup = getAgeGroup(age);
    const pushUpScores = testScore[gender]["hand-release-push-ups"];
    let score = 0;
  
    for (let reps in pushUpScores) {
      if (pushUps >= reps) {
        score = pushUpScores[reps][0][ageGroup];
      }
    }
    return score || 0;
  };
  
  const calculateSprintDragCarryScore = (gender, age, sprintDragCarry, testScore) => {
    if (!gender || !testScore[gender]) {
      return 0;
    }
    const ageGroup = getAgeGroup(age);
    const sprintDragCarryScores = testScore[gender]["sprint-drag-carry"];
    let score = 0;

    const totalSeconds = sprintDragCarry.minutes * 60 + sprintDragCarry.seconds;

    for (let time in sprintDragCarryScores) {
      const minutes = Number(time.slice(0, 2)); // Extracting minutes from the string
      const seconds = Number(time.slice(2, 4)); // Extracting seconds from the string
      const timeInSeconds = minutes * 60 + seconds;

      if (totalSeconds <= timeInSeconds) {
        score = sprintDragCarryScores[time][0][ageGroup];
        break; // Stop at the closest matching or lesser time
      }
    }
    return score || 0;
  };

  const calculatePlankScore = (gender, age, plank, testScore) => {
    if (!gender || !testScore[gender]) {
      return 0;
    }
    const ageGroup = getAgeGroup(age);
    const plankScores = testScore[gender]["plank"];
    let score = 0;

    const totalSeconds = plank.minutes * 60 + plank.seconds;

    for (let time in plankScores) {
      // Convert time string to total seconds
      const minutes = parseInt(time.substring(0, 2));
      const seconds = parseInt(time.substring(2, 4));
      const timeInSeconds = minutes * 60 + seconds;

      if (totalSeconds >= timeInSeconds) {
        score = plankScores[time][0][ageGroup];
      }
    }
    return score || 0;
  };

  const calculateRunScore = (gender, age, run, testScore) => {
    if (!gender || !testScore[gender]) {
      return 0;
    }
    const ageGroup = getAgeGroup(age);
    const runScores = testScore[gender]["two-mile-run"];
    let score = 0;

    const totalSeconds = run.minutes * 60 + run.seconds;

    // Iterate over runScores in descending order of time
    const timeKeys = Object.keys(runScores).sort((a, b) => b - a); // Sort times in descending order

    for (let time of timeKeys) {
      const minutes = parseInt(time.substring(0, 2));
      const seconds = parseInt(time.substring(2, 4));
      const timeInSeconds = minutes * 60 + seconds;

      // Scores increase as times decrease
      if (totalSeconds <= timeInSeconds) {
        score = runScores[time][0][ageGroup];
      }
    }
    return score || 0;
  };

  export { getAgeGroup, calculateDeadliftScore, calculatePowerThrowScore, calculatePushUpsScore, calculateRunScore, calculatePlankScore,calculateSprintDragCarryScore };