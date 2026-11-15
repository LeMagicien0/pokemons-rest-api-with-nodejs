const { error } = require("node:console")

const validTypes = ['Plante', 'Poison', 'Feu', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée', 'Eau']

module.exports = (sequilize, DataTypes) => {
    return sequilize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            // Contrainte
            unique: {
                msg: `Le nom est deja pris.`
            },
            // Validateur du champ hp
            validate: {
                notEmpty: {msg: "Le nom ne peut pas etre vide."},
                notNull: {msg: "Le nom du pokemon est une propriete requise"}
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // Validateur du champ hp
            validate: {
                isInt: {msg: "Utilisez uniquement des nombres entier pour les points de vie."},
                notNull: {msg: "Les points de vie sont une propriete requise"},
                // 0 to 999
                min: {
                    args: [0],
                    msg: `La valeur min des points de vie doit etre de 0`
                },
                max: {
                    args: [999],
                    msg: `La valeur max des points de vie doit etre de 999`
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            // Validateur du champ hp
            validate: {
                isInt: {msg: "Utilisez uniquement des nombres entier pour le champ des degats."},
                notNull: {msg: "Le champ des degat est une propriete requise"},
                // 0 to 99
                min: {
                    args: [0],
                    msg: `La valeur min des degats doit etre de 0`
                },
                max: {
                    args: [99],
                    msg: `La valeur max des degats doit etre de 99`
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            // Validateur du champ hp
            validate: {
                isUrl: {msg: " Le champ picture doit contenir l'URL d'une image."},
                notNull: {msg: "Le champ picture est une propriete requise"}
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            },
            validate: {
                // creation d'un validateur personnalise nomme isTypeValid
                isTypeValid(value) {
                    if(!value) {
                        throw new Error(`Un pokemon doit avoir au moin un type`)
                    }
                    if(value.split(',') > 3) {
                        throw new Error(`Un pokemon ne doit pas avoir plus de 3 type`)
                    }
                    value.split(',').forEach(type => {
                        if(!validTypes.includes(type)){
                            throw new Error(`Le type d'un pokemon doit appartenir a la liste suivante: ${validTypes}`)
                        }
                    });
                }
            }
        
        }
    },
    {
        timestamps: true,
        createdAt: 'created',
        updatedAt: false
    }
)
}