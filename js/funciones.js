const { createApp } = Vue;

createApp({
    data() {
        return {
            cartas: [],
            busqueda: "",
            seleccion: {},
            rarezaSeleccionada: '',
        }
    },

    mounted() {
        this.cargarAPI();
        
    },

    methods: {

        cargarAPI() {
            axios.get("js/clashroyale.json")
                .then(res => {
                    this.cartas = res.data.items;

                    // Guardar en localStorage
                    localStorage.setItem("cartas", JSON.stringify(this.cartas));
                });
        },

        verDetalle(carta) {
            this.seleccion = carta
            new bootstrap.Modal(document.getElementById('modalDetalle')).show()
        },
        filtroRareza(r) {
            this.rarezaSeleccionada = r
        },
        
    


    },

    computed: {
        filtradas() {
            return this.cartas.filter(c => {
                let coincideNombre = c.name.toLowerCase().includes(this.busqueda.toLowerCase())

                let coincideRareza = this.rarezaSeleccionada === '' || c.rarity === this.rarezaSeleccionada

                return coincideNombre && coincideRareza
            })
        },
        porcentaje() {
            if (this.cartas.length === 0) return 0;
            return Math.round((this.filtradas.length / this.cartas.length) * 100);
        },

    }

}).mount('#app');