"use client";

export default function QuemSomos() {
  return (
    <div style={{ minHeight: '100vh', background: '#061826', color: '#eafcff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 16px' }}>
      <div style={{ maxWidth: 700, background: '#101c2c', borderRadius: 22, boxShadow: '0 0 48px #00ffe0', padding: 48 }}>
        <h1 style={{ color: '#2fffd6', fontSize: '2.2em', marginBottom: 18, textAlign: 'center' }}>Equipe ECOWATCH</h1>
        <p style={{ fontSize: '1.15em', marginBottom: 24, textAlign: 'center' }}>
          O projeto EcoWatch idealizado pela equipe consiste em desenvolver nossas habilidades construídas até o momento na resolução do desafio BloomWatch proposta pela NASA. Esperamos que, apesar de ainda estarmos no começo da nosso percurso acadêmico, o projeto atenda aos requisitos propostos e que de alguma forma ele possa ajudar pessoas comuns ou até agricultores! Obrigado.
        </p>
        <h3 style={{ color: '#2fffd6', marginTop: 28, marginBottom: 10, textAlign: 'center' }}>Membros da equipe</h3>
        <p style={{ fontSize: '1.1em', marginBottom: 8, textAlign: 'center' }}>
          Somos uma equipe de três alunos da Fatec Sorocaba cursando o segundo semestre de Análise e Desenvolvimento de Sistemas.
        </p>
        <p style={{ fontSize: '1.1em', marginBottom: 18, textAlign: 'center', color: '#eafcff', fontWeight: 600 }}>
          Fatima Fortunato, Felipe Freitas e José Henrique
        </p>
        <h3 style={{ color: '#2fffd6', marginTop: 28, marginBottom: 10, textAlign: 'center' }}>Agradecimentos</h3>
        <p style={{ fontSize: '1.1em', marginBottom: 18, textAlign: 'center' }}>
          Agradecemos a Fatec Sorocaba e ao Hacknathon da Nasa por podermos tentar construir ferramentas que atendam alguma demanda e ajude a população.
        </p>
        <footer style={{ textAlign: 'center', marginTop: 32, color: '#2fffd6', fontSize: '1em', opacity: 0.8 }}>
          2025 NASA Space Apps Challenge
        </footer>
      </div>
    </div>
  );
}
