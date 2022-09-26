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
      Booking.belongsTo(
        models.Spot,
        { foreignKey: 'spotId' }
      ),
      Booking.belongsTo(
        models.User,
        { foreignKey: 'userId' }
      )
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
          let strDate = value.toString();

          for (let bookingRecord of sameIdRecords) {

            // if value is after startDate AND before endDate
            // throw new err
            //Validator.isAfter(strDate,bookingRecord.startDate.toString());
            //console.log("startdate:", strDate, "other booking startdate: ", bookingRecord.startDate, "other booking enddate ", bookingRecord.endDate)
            if (Validator.isAfter(strDate,bookingRecord.startDate.toString()) && Validator.isBefore(strDate,bookingRecord.endDate.toString())) {
              throw new Error('Startdate cannot conflict with other booking dates');
            }
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      validate: {
        // must be after startDate
        afterStartDate(value) {
          let endDate = value.toString();
          // if not is after, then throw error
          if (!Validator.isAfter(endDate,this.startDate.toString())) {
            throw new Error('End date cannot be on or before start date');
          }
        },
        // cannot be between startDate and EndDate
        // of another record of the same spotId
        async cannotConflict(value) {
          // find all records of same spotId
          // if value is after startDate AND before endDate
          // throw new err
          let strDate = value.toString();
          let sameIdRecords = await Booking.findAll({ where: { spotId: this.spotId } })
          for (let bookingRecord of sameIdRecords) {
            // if value is after startDate AND before endDate
            // throw new err
            if (Validator.isAfter(strDate,bookingRecord.startDate.toString()) && Validator.isBefore(strDate,bookingRecord.endDate.toString())) {
              throw new Error('Enddate cannot conflict with other booking dates');
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
