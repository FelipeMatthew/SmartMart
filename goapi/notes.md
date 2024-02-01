go mod tidy - vai instalar todas as dependências e pacotes que estão para ser instalado na aplicação

Principios do SOLID

camadas 

1. entity -> Vai criar a classe e um metodo para instanciar a classe 
2. database -> Vai fazer as queries , inserir dados no banco de dados e buscar os dados do banco
3. service ->  Vai ter todos os métodos da camada anterior, mas sem o acesso direto
4. webserver ->  Aqui é onde fica todo o tráfego http, receber requisições e respostas