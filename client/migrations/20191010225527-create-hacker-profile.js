export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("HackerProfiles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM,
        values: ["male", "female", "other"]
      },
      email: {
        type: Sequelize.STRING
      },
      ethnicity: {
        type: Sequelize.STRING
      },
      major: {
        type: Sequelize.STRING
      },
      minor: {
        type: Sequelize.STRING
      },
      resume: {
        type: Sequelize.STRING
      },
      skills: {
        type: Sequelize.STRING
      },
      interests: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("HackerProfiles");
  }
};
