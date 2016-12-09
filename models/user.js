"use strict"
module.exports = function(sequelize,DataType){

	var User = sequelize.define("User",{
	      name:DataType.STRING,
        lastname:DataType.STRING,
        email:{
            type:DataType.STRING,
            // unique:true
        },
        password: DataType.STRING,
        phone:DataType.STRING,
				gender: DataType.STRING,
        age:DataType.INTEGER,
	},{
		classMethods:{
			// associate:function(models){
			// 	User.belongsToMany(models.Incidencia,{through:models.IncidenciaPerson})
			// }
		}
	});

	return User;
}
