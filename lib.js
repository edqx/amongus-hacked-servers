// Enums

const languages = {
    "English": 0x00,
    "Spanish": 0x02,
    "Korean": 0x04,
    "Russian": 0x08,
    "Portuguese": 0x10,
    "Arabic": 0x20,
    "Filipino": 0x40,
    "Polish": 0x80,
    "Other": 0x01,
    0x00: "English",
    0x02: "Spanish",
    0x04: "Korean",
    0x08: "Russian",
    0x10: "Portuguese",
    0x20: "Arabic",
    0x40: "Filipino",
    0x80: "Polish",
    0x01: "Other"
};

const maps = {
    "The Skeld": 0x0,
    "Mira HQ": 0x1,
    "Polus": 0x2,
    0x0: "The Skeld",
    0x1: "Mira HQ",
    0x2: "Polus"
};

const distances = {
    "Short": 0x0,
    "Medium": 0x1,
    "Long": 0x2,
    0x0: "Short",
    0x1: "Medium",
    0x2: "Long"
};

// Offsets for each value.
const offsets = {
    iMaxPlayers: 0x01,
    iLanguage: 0x02,
    iMap: 0x06,
    fPlayerSpeed: 0x07,
    fCrewmateVision: 0xb,
    fImposterVision: 0xf,
    fKillCooldown: 0x13,
    iCommonTasks: 0x17,
    iLongTasks: 0x18,
    iShortTasks: 0x19,
    iEmergencyMeetings: 0x1a,
    iImposters: 0x1e,
    iKillDistance: 0x1f,
    iDiscussionTime: 0x20,
    iVotingTime: 0x24,
    bUseRecommendedSettings: 0x28,
    iEmergencyCooldown: 0x29,
    bConfirmEjects: 0x2a,
    bVisualTasks: 0x2b
};

/**
 * @typedef AmongUsGameOptions
 * @property {Number} maxPlayers
 * @property {"English"|"Spanish"|"Korean"|"Russian"|"Portuguese"|"Arabic"|"Filipino"|"Polish"|"Other"} language
 * @property {"The Skeld"|"Mira HQ"|"Polus"} map
 * @property {Number} playerSpeed
 * @property {Number} crewmateVision
 * @property {Number} imposterVision
 * @property {Number} killCooldown
 * @property {Number} commonTasks
 * @property {Number} longTasks
 * @property {Number} shortTasks
 * @property {Number} imposters
 * @property {Number} emergencyMeetings
 * @property {"Short"|"Medium"|"Long"} killDistance
 * @property {Number} discussionTime
 * @property {Number} votingTime
 * @property {Boolean} useRecommendedSettings
 * @property {Number} emergencyCooldown
 * @property {Boolean} confirmEjects
 * @property {Boolean} visualTasks
 */

/**
 * Get game settings from a gameHostOptions file buffer.
 * @param {Buffer} buffer The buffer to retrieve the game settings for.
 * @returns {AmongUsGameOptions}
 */
function getSettings(buffer) {
    return {
        maxPlayers: buffer.readUInt8(offsets.iMaxPlayers),
        language: languages[buffer.readUInt8(offsets.iLanguage)],
        map: maps[buffer.readUInt8(offsets.iMap)],
        playerSpeed: buffer.readFloatLE(offsets.fPlayerSpeed),
        crewmateVision: buffer.readFloatLE(offsets.fCrewmateVision),
        imposterVision: buffer.readFloatLE(offsets.fImposterVision),
        killCooldown: buffer.readFloatLE(offsets.fKillCooldown),
        commonTasks: buffer.readUInt8(offsets.iCommonTasks),
        longTasks: buffer.readUInt8(offsets.iLongTasks),
        shortTasks: buffer.readUInt8(offsets.iShortTasks),
        imposters: buffer.readUInt8(offsets.iImposters),
        emergencyMeetings: buffer.readUInt8(offsets.iEmergencyMeetings),
        killDistance: distances[buffer.readUInt8(offsets.iKillDistance)],
        discussionTime: buffer.readUInt8(offsets.iDiscussionTime),
        votingTime: buffer.readUInt8(offsets.iVotingTime),
        useRecommendedSettings: buffer.readUInt8(offsets.bUseRecommendedSettings),
        emergencyCooldown: buffer.readUInt8(offsets.iEmergencyCooldown),
        confirmEjects: buffer.readUInt8(offsets.bConfirmEjects) ? true : false,
        visualTasks: buffer.readUInt8(offsets.bVisualTasks) ? true : false,
    }
}

/**
 * Write game settings to a gameHostOptions file buffer.
 * @param {AmongUsGameOptions} settings
 * @returns {Buffer}
 */
function writeSettings(settings) {
    const template_buffer = Buffer.alloc(0x2c);

    if (settings.useRecommendedSettings === "off") settings.useRecommendedSettings = false;
    if (settings.confirmEjects === "off") settings.confirmEjects = false;
    if (settings.visualTasks === "off") settings.visualTasks = false;

    template_buffer.writeUInt8(0x3, 0x0); // unknown values

    template_buffer.writeUInt8(settings.maxPlayers, offsets.iMaxPlayers);
    template_buffer.writeUInt8(languages[settings.language], offsets.iLanguage);
    
    if (settings.language === "English") {
        template_buffer.writeUInt8(0x01, offsets.iLanguage + 1); // Not sure, when the language is English, it requires a 0x1 at 0x03
    }

    template_buffer.writeUInt8(maps[settings.map] || 0, offsets.iMap);
    template_buffer.writeFloatLE(settings.playerSpeed, offsets.fPlayerSpeed);
    template_buffer.writeFloatLE(settings.crewmateVision, offsets.fCrewmateVision);
    template_buffer.writeFloatLE(settings.imposterVision, offsets.fImposterVision);
    template_buffer.writeFloatLE(settings.killCooldown, offsets.fKillCooldown);
    template_buffer.writeUInt8(settings.commonTasks, offsets.iCommonTasks);
    template_buffer.writeUInt8(settings.longTasks, offsets.iLongTasks);
    template_buffer.writeUInt8(settings.shortTasks, offsets.iShortTasks);
    template_buffer.writeUInt8(settings.emergencyMeetings, offsets.iEmergencyMeetings);
    template_buffer.writeUInt8(settings.imposters, offsets.iImposters);
    template_buffer.writeUInt8(distances[settings.killDistance], offsets.iKillDistance);
    template_buffer.writeUInt8(settings.discussionTime, offsets.iDiscussionTime);
    template_buffer.writeUInt8(settings.votingTime, offsets.iVotingTime);
    template_buffer.writeUInt8(settings.useRecommendedSettings ? true : false, offsets.bUseRecommendedSettings);
    template_buffer.writeUInt8(settings.emergencyCooldown, offsets.iEmergencyCooldown);
    template_buffer.writeUInt8(settings.confirmEjects ? true : false, offsets.bConfirmEjects);
    template_buffer.writeUInt8(settings.visualTasks ? true : false, offsets.bVisualTasks);

    return template_buffer;
}

module.exports = {
    maps,
    languages,
    distances,
    offsets,
    getSettings,
    writeSettings
};