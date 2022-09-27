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
        { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true }
      ),
      Booking.belongsTo(
        models.User,
        { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true }
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
      type: DataTypes.DATEONLY,
      validate: {
        async cannotConflict(value) {
          let sameIdRecords = await Booking.findAll({ where: { spotId: this.spotId } })
          let strDate = value.toString();
          console.log(strDate);
          for (let bookingRecord of sameIdRecords) {
            if ((Validator.isAfter(strDate,bookingRecord.startDate.toString()) && Validator.isBefore(strDate,bookingRecord.endDate.toString())) || strDate === bookingRecord.startDate.toString()) {
              throw new Error('Startdate cannot conflict with other booking dates');
            }
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATEONLY,
      validate: {
        afterStartDate(value) {
          let endDate = value.toString();
          if (!Validator.isAfter(endDate,this.startDate.toString())) {
            throw new Error('End date cannot be on or before start date');
          }
        },

        async cannotConflict(value) {
          let strDate = value.toString();
          let sameIdRecords = await Booking.findAll({ where: { spotId: this.spotId } })
          for (let bookingRecord of sameIdRecords) {
            if ((Validator.isAfter(strDate,bookingRecord.startDate.toString()) && Validator.isBefore(strDate,bookingRecord.endDate.toString())) || strDate === bookingRecord.endDate.toString()) {
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
