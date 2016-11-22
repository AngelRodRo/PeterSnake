"use strict"
module.exports = function(sequelize,DataType){

	var User = sequelize.define("Costumer",{
	      name:DataType.STRING,
        lastname:DataType.STRING,
        email:{
            type:DataType.STRING,
            unique:true
        },
        password: DataType.STRING,
        phone:DataType.STRING,
	},{
		classMethods:{
			associate:function(models){
				User.belongsToMany(models.Incidencia,{through:models.IncidenciaPerson})
			}
		}
	});

	return User;
}
