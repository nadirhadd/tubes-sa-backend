function parseTime(time) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function parseAvailability(availability) {
  return availability.map(({ day, time }) => {
    const [startTime, endTime] = time.split('-').map(parseTime);
    return {
      day,
      startTime,
      endTime,
    };
  });
}

function scheduleMeetings(meetings) {
  const slots = meetings.flatMap(meeting => 
    parseAvailability(meeting.availability).map(slot => ({
      ...slot,
      topic: meeting.topic,
      company: meeting.company,
      id: meeting._id
    }))
  );

  slots.sort((a, b) => {
    if (a.day === b.day) {
      return a.startTime - b.startTime;
    }
    return a.day.localeCompare(b.day);
  });

  const scheduledMeetings = [];
  const scheduledTimes = {};

  slots.forEach(slot => {
    const { day, startTime, endTime, topic, company, id } = slot;
    
    if (!scheduledTimes[day]) {
      scheduledTimes[day] = [];
    }
    
    const conflict = scheduledTimes[day].some(
      time => time.startTime < endTime && time.endTime > startTime
    );

    if (!conflict) {
      scheduledTimes[day].push({ startTime, endTime });
      scheduledMeetings.push({ id, topic, company, day, startTime, endTime });
    }
  });

  return scheduledMeetings;
}

module.exports = { scheduleMeetings };
