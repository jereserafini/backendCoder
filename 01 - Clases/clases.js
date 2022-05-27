class User {

    constructor( name, surname, books, pets ){

        this.name = name
        this. surname = surname
        this.books = books
        this.pets = pets

    }

    getFullName(){
        return console.log(`${ this.name } ${ this.surname }`);
    }

    addPet( pet ) {
        this.pets = [ ...this.pets, pet ]
    }

    countPet () {
        return console.log( `Cantidad de mascotas: ${this.pets.length}` );
    }

    addBook( title, author ) {
        this.books = [ ...this.books , { title, author } ]
    }

    getBookNames(){
        let output = ''
        this.books.forEach( e => {
            output += `- ${e.title}\n`
        });
        return console.log( output );
    }

}

console.clear()

let user1 = new User ('Jeremías', 'Fernández', [], [])
user1.getFullName()
user1.addPet( 'dog' )
user1.addPet( 'cat' )
user1.countPet()
user1.addBook( 'Don Quijote de la Mancha', 'Miguel de Cervantes' )
user1.addBook( 'Moby-Dick', 'Herman Melville' )
user1.addBook( 'Las aventuras de Alicia en el país de las maravillas', 'Lewis Carroll' )
user1.getBookNames()