## DTO - Data Transfer Object

Objeto que só tem propriedades, sendo utilizado para transporte entre camadas da aplicação

## Repository

Realizar a persistência de aggregates (clusters de objetos de domínio como entities e value objects), separando essa responsabilidade da aplicação

## Adapter

Converte a interface de uma classe em outra esperada pelo cliente, permitindo que classes incompatíveis trabalhem juntas

## Strategy

Criar comportamento intercambiável

## Dynamic Factory

Criar uma instância com base em uma string

## Presenter

Formatar e adequar um determinado conjunto de dados às necessidades do cliente

## Decorator

Permite acrescentar funcionalidades a um objeto existente (OCP)

## Controller

Conecte o driver com a aplicação, repassando os dados de entrada e retornando a saída de acordo com o drive

## Composition Root

Entry point da aplicação, onde são criadas as instâncias utilizadas pelos componentes, monta o grafo de dependencias da aplicação

## Mediator

Cria um mecanismo de notificação para reduzir o acoplamento entre os objetos

## Referencias

- [Refactoring Guru](https://refactoring.guru/design-patterns/)
- [Padrões de Projetos: Soluções Reutilizáveis de Software Orientados a Objetos](https://www.amazon.com.br/Padr%C3%B5es-Projetos-Solu%C3%A7%C3%B5es-Reutiliz%C3%A1veis-Orientados/dp/8573076100/ref=asc_df_8573076100/?tag=googleshopp00-20&linkCode=df0&hvadid=379748659420&hvpos=&hvnetw=g&hvrand=15876846210128354133&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9102227&hvtargid=pla-812887614857&psc=1&mcid=2f59b4d0d8533e1a9bfcd99838e1a3ee)
- [Use a Cabeça! Padrões de Projetos](https://www.amazon.com.br/Cabe%C3%A7a-Padr%C3%B5es-Projetos-Eric-Freeman/dp/8576081741)
- [Patterns of Enterprise Application Architecture](https://www.amazon.com.br/Padr%C3%B5es-Arquitetura-Aplica%C3%A7%C3%B5es-Corporativas-Martin-ebook/dp/B07FCPZ2R2/ref=sr_1_2?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=IIG9XS1VWERE&dib=eyJ2IjoiMSJ9.KweUYqg07Sap64Z1tPaR99W93qMzM96XWgaR83X2NSwTzuPvJ1qbyOvfgNNeh_2c0nz0aYvhGWlyr5yq_JoUzP_sj5mGk48Y_FMeOMzLalByqMvRdomUIGYk2LtXrJMF8bNsc7LdDVtctuj0z9fQQnLKqNwNfsrosOdhXoIVRUQQFd1VzOZ2eO_ow-esoetB-DpL4dXcfKiVZMg3c5rG40FCSJG-w5K65r43zrmQAwQ.WljlwWiVjwo6LmUWA7_jE89bUqbpdMILWrlGAY31QaA&dib_tag=se&keywords=Patterns+of+Enterprise+Application+Architecture&qid=1711040392&s=books&sprefix=patterns+of+enterprise+application+architecture%2Cstripbooks%2C482&sr=1-2)