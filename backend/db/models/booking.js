'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    },
    startDate: {
      type: DataTypes.DATE,
      validate: {
        // cannot be between startDate and EndDate
        // of another record of the same spotId
        async cannotConflict(value) {
          // find all records of same spotId
          let sameIdRecords = await Booking.findAll({ where: { spotId: this.spotId } })
          for (let bookingRecord of sameIdRecords) {
            // if value is after startDate AND before endDate
            // throw new err
            if (Validator.isAfter(value,bookingRecord.startDate) && Validator.isBefore(value,bookingRecord.endDate)) {
              throw new Error;
            }
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      validate: {
        // must be after startDate
        isAfter: this.startDate,
        // cannot be between startDate and EndDate
        // of another record of the same spotId
        async cannotConflict(value) {
          // find all records of same spotId
          // if value is after startDate AND before endDate
          // throw new err
          let sameIdRecords = await Booking.findAll({ where: { spotId: this.spotId } })
          for (let bookingRecord of sameIdRecords) {
            // if value is after startDate AND before endDate
            // throw new err
            if (Validator.isAfter(value,bookingRecord.startDate) && Validator.isBefore(value,bookingRecord.endDate)) {
              throw new Error;
            }
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
