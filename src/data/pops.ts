import type { PopItem } from "@/types/pop";

export const POPS: PopItem[] = [
  // TEMA 1: WINDOWS E DESEMPENHO (POP-001 a POP-008)
  {
    code: "POP-001",
    themeId: 1,
    goal: "Para liberar espaço com segurança",
    title: "Como limpar arquivos temporários",
    keywords: "limpar espaco disco cheio memoria temporarios cache lixeira downloads",
    steps: [
      {
        lead: "Abra as Configurações do Windows",
        text: "Pressione <kbd>Win</kbd> + <kbd>I</kbd> no teclado (ou clique no menu <strong>Iniciar</strong> e no ícone de engrenagem <strong>Configurações</strong>).",
      },
      {
        lead: "Entre em Sistema > Armazenamento",
        text: "No menu lateral esquerdo, clique em <strong>Sistema</strong> e depois em <strong>Armazenamento</strong>. Aguarde alguns segundos até o Windows calcular o tamanho das pastas.",
      },
      {
        lead: "Clique em Arquivos temporários",
        text: "Na lista de categorias do disco, selecione <strong>Arquivos temporários</strong> para visualizar o que pode ser apagado sem risco.",
      },
      {
        lead: "Marque apenas itens seguros e clique em Remover arquivos",
        text: "Deixe marcadas opções como <em>Arquivos temporários da Internet</em>, <em>Miniaturas</em> e <em>Lixeira</em>. <strong>Desmarque a pasta Downloads</strong> caso guarde documentos importantes lá.",
      },
    ],
  },
  {
    code: "POP-002",
    themeId: 1,
    goal: "Para melhorar o desempenho",
    title: "Como identificar programas que deixam o notebook lento",
    keywords: "lento lentidao travando pesado programas processos consumo",
    steps: [
      {
        lead: "Abra o Gerenciador de Tarefas",
        text: "Pressione juntas as teclas <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Esc</kbd>. Se aparecer uma janela compacta, clique em <strong>Mais detalhes</strong> na parte inferior.",
      },
      {
        lead: "Ordene pela coluna CPU ou Memória",
        text: "Na aba <strong>Processos</strong>, clique diretamente sobre o título da coluna <strong>CPU</strong> (ou <strong>Memória</strong>). Uma seta indicará os programas que mais consomem recursos no topo.",
      },
      {
        lead: "Feche aplicativos desnecessários",
        text: "Observe quais programas em aberto (navegadores com muitas abas, reprodutores ou utilitários sem uso) estão no topo e feche-os normalmente pela janela do próprio programa.",
      },
    ],
  },
  {
    code: "POP-003",
    themeId: 1,
    goal: "Para reduzir o tempo de inicialização",
    title: "Como gerenciar programas de inicialização",
    keywords: "ligar demora iniciar boot inicializacao lento ao ligar",
    steps: [
      {
        lead: "Acesse a aba Aplicativos de inicialização",
        text: "No <strong>Gerenciador de Tarefas</strong> (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Esc</kbd>), clique na aba <strong>Aplicativos de inicialização</strong> no menu lateral ou superior.",
      },
      {
        lead: "Avalie o Impacto na inicialização",
        text: "Verifique os programas marcados como <strong>Habilitado</strong> e observe a coluna <em>Impacto na inicialização</em> (Alto, Médio ou Baixo).",
      },
      {
        lead: "Desabilite itens não essenciais",
        text: "Clique com o botão direito sobre aplicativos pessoais ou não críticos e escolha <strong>Desabilitar</strong>. Nunca desative o antivírus corporativo nem o OneDrive.",
      },
    ],
  },
  {
    code: "POP-004",
    themeId: 1,
    goal: "Para identificar causas de lentidão",
    title: "Como verificar o consumo de CPU, RAM e disco",
    keywords: "cpu ram memoria disco 100% desempenho lento gargalo",
    steps: [
      {
        lead: "Abra a aba Desempenho",
        text: "No <strong>Gerenciador de Tarefas</strong> (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Esc</kbd>), clique no ícone de gráfico chamado <strong>Desempenho</strong>.",
      },
      {
        lead: "Leia os percentuais de uso",
        text: "Clique em <strong>CPU</strong>, <strong>Memória</strong> e <strong>Disco</strong> à esquerda. Se algum deles permanecer travado entre <strong>90% e 100%</strong> por vários minutos, há sobrecarga no equipamento.",
      },
      {
        lead: "Aja conforme o componente sobrecarregado",
        text: "Memória cheia pede o fechamento de abas do navegador; Disco em 100% costuma indicar atualização do Windows em andamento — aguarde alguns minutos e reinicie.",
      },
    ],
  },
  {
    code: "POP-005",
    themeId: 1,
    goal: "Para resolver problemas temporários",
    title: "Como reiniciar corretamente o Windows",
    keywords: "reiniciar desligar bug falha temporaria limpar memoria",
    steps: [
      {
        lead: "Salve e feche todos os arquivos",
        text: "Guarde alterações em planilhas, textos e sistemas web para evitar perda de trabalho.",
      },
      {
        lead: "Use a opção Reiniciar (e não Desligar)",
        text: "Clique em <strong>Iniciar &gt; Ligar/Desligar &gt; Reiniciar</strong>. No Windows moderno, <em>Desligar</em> apenas hiberna o núcleo do sistema para ligar mais rápido; somente <strong>Reiniciar</strong> limpa a memória por completo.",
      },
    ],
  },
  {
    code: "POP-006",
    themeId: 1,
    goal: "Para evitar armazenamento cheio",
    title: "Como verificar o espaço disponível no SSD",
    keywords: "ssd disco c cheio espaco livre gb armazenamento",
    steps: [
      {
        lead: "Abra o Explorador de Arquivos",
        text: "Pressione <kbd>Win</kbd> + <kbd>E</kbd> e clique em <strong>Este Computador</strong> no painel esquerdo.",
      },
      {
        lead: "Confira a barra do Disco Local (C:)",
        text: "Observe o espaço livre abaixo da barra azul. Se a barra ficar <strong>vermelha</strong> (menos de 10% livre), o Windows perde velocidade e pode falhar ao salvar arquivos. Mantenha sempre ao menos <strong>15% a 20% livres</strong>.",
      },
    ],
  },
  {
    code: "POP-007",
    themeId: 1,
    goal: "Para identificar aplicativos travados",
    title: "Como utilizar o Gerenciador de Tarefas",
    keywords: "gerenciador de tarefas nao respondendo congelou finalizar tarefa",
    steps: [
      {
        lead: "Acione o atalho de emergência",
        text: "Pressione <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Esc</kbd> (ou pressione <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Del</kbd> e clique em <strong>Gerenciador de Tarefas</strong>).",
      },
      {
        lead: 'Localize o programa com status "Não respondendo"',
        text: "Na lista de aplicativos abertos, clique sobre o programa que congelou.",
      },
      {
        lead: "Clique em Finalizar tarefa",
        text: "Use o botão <strong>Finalizar tarefa</strong> para encerrar apenas o programa travado sem precisar desligar o notebook inteiro.",
      },
    ],
  },
  {
    code: "POP-008",
    themeId: 1,
    goal: "Para manter o sistema atualizado conforme a política de TI",
    title: "Como utilizar o Windows Update",
    keywords: "windows update atualizar atualizacao seguranca sistema",
    steps: [
      {
        lead: "Abra o painel Windows Update",
        text: "Pressione <kbd>Win</kbd> + <kbd>I</kbd> e clique em <strong>Windows Update</strong> no menu lateral esquerdo.",
      },
      {
        lead: "Verifique e baixe as atualizações aprovadas",
        text: "Clique em <strong>Verificar se há atualizações</strong>. O sistema baixará automaticamente os pacotes liberados pela política de TI da empresa.",
      },
      {
        lead: "Reinicie no fim do expediente",
        text: "Quando aparecer o aviso <em>Reinicialização necessária</em>, conclua a atualização ao final do dia de trabalho para não interromper reuniões.",
      },
    ],
  },

  // TEMA 2: LIMPEZA E CONSERVAÇÃO FÍSICA (POP-009 a POP-014)
  {
    code: "POP-009",
    themeId: 2,
    goal: "Para evitar danos ao display",
    title: "Como limpar a tela corretamente",
    keywords: "limpar tela monitor display mancha microfibra alcool",
    steps: [
      {
        lead: "Desligue o notebook",
        text: "Desligue o equipamento para enxergar melhor marcas de dedos e evitar toques acidentais.",
      },
      {
        lead: "Passe um pano de microfibra seco",
        text: "Faça movimentos suaves e circulares sem pressionar o painel LCD/LED.",
      },
      {
        lead: "Para manchas persistentes, umedeça levemente o pano",
        text: "Aplique apenas algumas gotas de água destilada ou limpa-telas específico <strong>no pano de microfibra</strong> (nunca direto na tela) e seque em seguida com o lado seco do pano.",
      },
    ],
  },
  {
    code: "POP-010",
    themeId: 2,
    goal: "Para conservar os periféricos",
    title: "Como higienizar teclado e touchpad",
    keywords: "limpar teclado touchpad teclas higienizar sujeira alcool isopropilico",
    steps: [
      {
        lead: "Desligue e desconecte da tomada",
        text: "Remova o cabo de energia e qualquer dispositivo USB antes de iniciar a limpeza.",
      },
      {
        lead: "Remova poeira solta",
        text: "Incline o notebook levemente de lado e passe um pincel macio ou pano seco entre as teclas.",
      },
      {
        lead: "Higienize com álcool isopropílico (70%+)",
        text: "Umedeça levemente um pano de microfibra com <strong>álcool isopropílico</strong> (que evapora rápido e não oxida circuitos), limpe teclas e touchpad e aguarde 2 minutos antes de ligar.",
      },
    ],
  },
  {
    code: "POP-011",
    themeId: 2,
    goal: "Para reduzir o desgaste da bateria",
    title: "Como preservar a bateria",
    keywords: "bateria carregar descarregar vida util autonomia tomada",
    steps: [
      {
        lead: "Evite zerar a bateria com frequência",
        text: "Conecte o carregador sempre que a carga chegar por volta de <strong>20%</strong>. Descargas completas constantes aceleram o desgaste químico das células.",
      },
      {
        lead: "Proteja contra calor excessivo",
        text: "Nunca deixe o notebook dentro do carro ao sol ou operando sobre superfícies que abafam o calor.",
      },
      {
        lead: "Faça ciclos ocasionais se usar sempre na tomada",
        text: "Caso trabalhe o tempo todo conectado à energia, utilize o notebook na bateria até cerca de 30% uma vez a cada duas semanas.",
      },
    ],
  },
  {
    code: "POP-012",
    themeId: 2,
    goal: "Para evitar danos físicos",
    title: "Como transportar o notebook",
    keywords: "transportar mochila levar viagem tampa tela quebrar",
    steps: [
      {
        lead: "Verifique o teclado antes de fechar a tampa",
        text: "Certifique-se de que não há canetas, fones de ouvido, clipes ou cabos sobre o teclado — fechar a tampa sobre objetos trinca a tela imediatamente.",
      },
      {
        lead: "Desligue ou hiberne antes de guardar na mochila",
        text: "Nunca guarde o notebook ligado ou apenas em suspensão dentro de mochilas fechadas, pois ele pode despertar e superaquecer sem ventilação.",
      },
      {
        lead: "Use compartimento acolchoado e segure pela base",
        text: "Transporte em mochila ou pasta com divisória acolchoada dedicada e nunca segure o aparelho aberto apenas pela borda da tela.",
      },
    ],
  },
  {
    code: "POP-013",
    themeId: 2,
    goal: "Para evitar danos elétricos",
    title: "Cuidados com carregadores e cabos",
    keywords: "carregador fonte cabo fio energia tomada curto",
    steps: [
      {
        lead: "Utilize apenas a fonte original ou homologada",
        text: "Fontes genéricas com voltagem ou amperagem incompatíveis danificam a placa-mãe e a bateria.",
      },
      {
        lead: "Enrole os cabos sem dobrar as pontas",
        text: "Faça laços largos ao guardar o carregador, evitando tensionar ou dobrar o fio junto ao conector da fonte ou do notebook.",
      },
      {
        lead: "Desconecte segurando pelo plugue",
        text: "Puxe sempre pelo conector rígido, nunca pelo cabo. Caso note fio desencapado, mau contato ou cheiro de queimado, suspenda o uso e acione a TI.",
      },
    ],
  },
  {
    code: "POP-014",
    themeId: 2,
    goal: "Para melhorar a ventilação do equipamento",
    title: "Como evitar superaquecimento",
    keywords: "quente esquentando superaquecimento cooler ventilacao barulho",
    steps: [
      {
        lead: "Use sempre sobre superfícies rígidas e planas",
        text: "Apoie o notebook em mesas ou suportes ergonômicos que deixem a base livre para circulação de ar.",
      },
      {
        lead: "Evite camas, sofás e almofadas",
        text: "Tecidos macios bloqueiam as entradas de ar inferiores do cooler, causando aquecimento excessivo e redução automática de velocidade.",
      },
      {
        lead: "Mantenha as saídas de ar desobstruídas",
        text: "Não encoste papéis, livros ou objetos nas aberturas laterais e traseiras de exaustão de calor.",
      },
    ],
  },

  // TEMA 3: SEGURANÇA DIGITAL (POP-015 a POP-021)
  {
    code: "POP-015",
    themeId: 3,
    goal: "Para proteger informações corporativas",
    title: "Como bloquear a tela ao se ausentar",
    keywords: "bloquear tela sair mesa senha win l privacidade",
    steps: [
      {
        lead: "Pressione Win + L sempre que levantar da mesa",
        text: "Mesmo que seja para ir ao café, banheiro ou falar com um colega ao lado, pressione <kbd>Win</kbd> + <kbd>L</kbd>.",
      },
      {
        lead: "Confirme a tela de bloqueio antes de sair",
        text: "Certifique-se de que a tela solicitando sua senha ou PIN apareceu antes de afastar-se do notebook.",
      },
    ],
  },
  {
    code: "POP-016",
    themeId: 3,
    goal: "Para prevenir ataques de phishing",
    title: "Como identificar e-mails suspeitos",
    keywords: "email suspeito phishing golpe link boleto falso spam",
    steps: [
      {
        lead: "Confira o endereço real do remetente",
        text: 'Não olhe apenas o nome exibido; verifique o domínio após o <code class="inline-code">@</code> para detectar trocas sutis de letras (ex.: <code class="inline-code">@ecov1s-suporte.com</code>).',
      },
      {
        lead: "Desconfie de urgência, ameaças ou pedidos de senha",
        text: "Mensagens sobre bloqueio imediato de conta, boletos inesperados ou atualização cadastral urgente são sinais clássicos de golpe.",
      },
      {
        lead: "Passe o mouse sobre links sem clicar",
        text: "Veja o endereço real que aparece no canto da tela antes de abrir qualquer link e nunca execute anexos desconhecidos (<em>.exe, .zip, .scr, .js</em>). Em dúvida, encaminhe para a TI validar.",
      },
    ],
  },
  {
    code: "POP-017",
    themeId: 3,
    goal: "Para evitar acessos não autorizados",
    title: "Como criar e proteger senhas",
    keywords: "senha criar trocar forte mfa autenticacao",
    steps: [
      {
        lead: "Crie senhas longas e exclusivas",
        text: "Use no mínimo <strong>12 caracteres</strong> combinando letras maiúsculas, minúsculas, números e símbolos (ou uma frase-senha longa e fácil de lembrar).",
      },
      {
        lead: "Nunca reutilize a senha da empresa",
        text: "Jamais use a mesma senha corporativa em lojas, redes sociais ou cadastros pessoais.",
      },
      {
        lead: "Mantenha a Autenticação Multifator (MFA) ativa",
        text: "Não anote senhas em post-its no monitor, cadernos na mesa ou blocos de notas sem proteção.",
      },
    ],
  },
  {
    code: "POP-018",
    themeId: 3,
    goal: "Para reduzir riscos de malware",
    title: "Como utilizar dispositivos USB com segurança",
    keywords: "usb pendrive hd externo malware antivirus ejetar",
    steps: [
      {
        lead: "Nunca conecte pendrives desconhecidos",
        text: "Dispositivos encontrados em estacionamentos, recepções ou entregues sem origem confiável podem conter códigos maliciosos automáticos.",
      },
      {
        lead: "Passe o antivírus antes de abrir arquivos",
        text: "Ao conectar um dispositivo autorizado, abra o Explorador de Arquivos (<kbd>Win</kbd> + <kbd>E</kbd>), clique com o botão direito sobre a unidade USB e selecione <strong>Verificar com o antivírus</strong>.",
      },
      {
        lead: "Ejete com segurança antes de puxar",
        text: "Clique no ícone de USB na barra de tarefas (canto inferior direito) e selecione <strong>Ejetar</strong> para não corromper dados.",
      },
    ],
  },
  {
    code: "POP-019",
    themeId: 3,
    goal: "Para evitar perda de dados",
    title: "Como armazenar arquivos corporativos",
    keywords: "salvar arquivos backup onedrive sharepoint rede nuvem",
    steps: [
      {
        lead: "Salve sempre nos repositórios oficiais",
        text: "Guarde seus documentos no <strong>OneDrive corporativo</strong>, SharePoint ou pastas de rede definidas pela empresa — assim há backup automático em caso de defeito ou roubo do notebook.",
      },
      {
        lead: "Não deixe arquivos críticos apenas em Downloads",
        text: "Pastas locais sem sincronização não possuem recuperação automática em caso de falha do disco.",
      },
    ],
  },
  {
    code: "POP-020",
    themeId: 3,
    goal: "Para orientar a resposta inicial a incidentes",
    title: "O que fazer ao suspeitar de vírus",
    keywords: "virus malware ransomware cliquei link estranho invasao",
    steps: [
      {
        lead: "Desconecte o notebook da internet imediatamente",
        text: "Desative o Wi-Fi ou retire o cabo de rede na hora para impedir que a ameaça se espalhe pela rede da empresa ou envie dados para fora.",
      },
      {
        lead: "Não desligue bruscamente nem apague arquivos",
        text: "Mantenha o equipamento como está para que a equipe técnica possa investigar e conter o incidente.",
      },
      {
        lead: "Avise a TI imediatamente",
        text: "Entre em contato por telefone ou pelo celular corporativo informando o ocorrido e o que foi clicado.",
      },
    ],
  },
  {
    code: "POP-021",
    themeId: 3,
    goal: "Para proteger conexões e informações",
    title: "Como utilizar redes Wi-Fi externas",
    keywords: "wifi externo hotel aeroporto cafe vpn rede publica home office",
    steps: [
      {
        lead: "Prefira o roteamento do celular (4G/5G)",
        text: "Evite redes públicas abertas de aeroportos, cafés, shoppings e hotéis sempre que possível.",
      },
      {
        lead: "Conecte a VPN corporativa antes de trabalhar",
        text: "Se precisar usar um Wi-Fi externo, ative obrigatoriamente a <strong>VPN da empresa</strong> antes de acessar sistemas internos, e-mails ou arquivos.",
      },
    ],
  },

  // TEMA 4: PRODUTIVIDADE E USABILIDADE (POP-022 a POP-028)
  {
    code: "POP-022",
    themeId: 4,
    goal: "Para agilizar tarefas diárias",
    title: "Atalhos essenciais do Windows",
    keywords: "atalhos teclado produtividade rapido teclas",
    steps: [
      {
        lead: "Memorize os 6 atalhos de maior ganho diário",
        text: "Use a tabela de referência rápida abaixo para bloquear a tela, abrir pastas, alternar janelas e capturar telas sem tirar as mãos do teclado.",
      },
    ],
  },
  {
    code: "POP-023",
    themeId: 4,
    goal: "Para melhorar a organização digital",
    title: "Como organizar arquivos e pastas",
    keywords: "organizar pastas nomes arquivos padronizar area de trabalho",
    steps: [
      {
        lead: "Crie pastas por área, projeto ou ano",
        text: "Evite salvar dezenas de arquivos soltos na Área de Trabalho; agrupe por assunto ou cliente.",
      },
      {
        lead: "Padronize o nome dos arquivos",
        text: 'Use formatos fáceis de ordenar, como <code class="inline-code">2026-11_Relatorio_Mensal_v1</code>, e evite caracteres especiais (<code class="inline-code">/ \\ : * ? " &lt; &gt; |</code>) que causam erros de sincronização.',
      },
    ],
  },
  {
    code: "POP-024",
    themeId: 4,
    goal: "Para facilitar a execução de múltiplas tarefas",
    title: "Como utilizar múltiplas janelas",
    keywords: "dividir tela duas janelas lado a lado multitarefa",
    steps: [
      {
        lead: "Encaixe duas janelas lado a lado",
        text: "Com uma janela ativa, pressione <kbd>Win</kbd> + <kbd>Seta Esquerda</kbd>. Ela ocupará metade da tela e o Windows sugerirá automaticamente outra janela para preencher o lado direito.",
      },
      {
        lead: "Separe tarefas por Áreas de Trabalho Virtuais",
        text: "Pressione <kbd>Win</kbd> + <kbd>Tab</kbd> e clique em <strong>Nova área de trabalho</strong> no topo para separar janelas de reuniões e de operação.",
      },
    ],
  },
  {
    code: "POP-025",
    themeId: 4,
    goal: "Para melhorar a produtividade e a ergonomia",
    title: "Como configurar monitores externos",
    keywords: "monitor externo segunda tela hdmi estender duplicar ergonomia",
    steps: [
      {
        lead: "Conecte o cabo de vídeo e pressione Win + P",
        text: "Após ligar o cabo HDMI, DisplayPort ou USB-C, pressione <kbd>Win</kbd> + <kbd>P</kbd> e selecione <strong>Estender</strong> para usar as duas telas de forma independente.",
      },
      {
        lead: "Alinhe a posição física das telas",
        text: "Abra <strong>Configurações &gt; Sistema &gt; Tela</strong> (<kbd>Win</kbd> + <kbd>I</kbd>), clique em <strong>Identificar</strong> para ver qual tela é a 1 e qual é a 2, e arraste os retângulos para corresponder ao lado em que o monitor está na sua mesa.",
      },
      {
        lead: "Ajuste a altura ergonômica",
        text: "Posicione o topo do monitor principal na altura da linha dos seus olhos para evitar tensão cervical.",
      },
    ],
  },
  {
    code: "POP-026",
    themeId: 4,
    goal: "Para facilitar a comunicação e o suporte",
    title: "Como realizar capturas de tela",
    keywords: "print screen captura tela recorte imagem foto tela",
    steps: [
      {
        lead: "Acione a Ferramenta de Captura",
        text: "Pressione <kbd>Win</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd>. A tela escurecerá levemente e aparecerá uma barra pequena no topo.",
      },
      {
        lead: "Selecione a área desejada e cole",
        text: "Arraste o mouse sobre a mensagem de erro ou tela que deseja mostrar. A imagem fica salva na memória — basta pressionar <kbd>Ctrl</kbd> + <kbd>V</kbd> no e-mail, Teams ou chamado de TI.",
      },
    ],
  },
  {
    code: "POP-027",
    themeId: 4,
    goal: "Para resolver problemas em reuniões",
    title: "Como configurar áudio e microfone",
    keywords: "audio som microfone fone headset reuniao teams zoom mudo",
    steps: [
      {
        lead: "Escolha a saída de som correta na barra de tarefas",
        text: "Clique no ícone de <strong>alto-falante</strong> no canto inferior direito da tela e selecione seu fone/headset (ou os alto-falantes do notebook).",
      },
      {
        lead: "Verifique o microfone nas Configurações de Som",
        text: "Acesse <strong>Configurações &gt; Sistema &gt; Som</strong> e confira em <em>Entrada</em> se o microfone correto está selecionado e se a barra azul se move quando você fala.",
      },
      {
        lead: "Confirme dentro do aplicativo da reunião",
        text: "No Teams, Zoom ou Google Meet, clique nos três pontinhos (<strong>Configurações de dispositivo</strong>) e garanta que o mesmo headset esteja escolhido para áudio e microfone.",
      },
    ],
  },
  {
    code: "POP-028",
    themeId: 4,
    goal: "Para sincronizar arquivos, quando adotado pela empresa",
    title: "Como utilizar corretamente o OneDrive",
    keywords: "onedrive nuvem sincronizar sincronizacao erro x vermelho",
    steps: [
      {
        lead: "Confira o ícone de nuvem na barra de tarefas",
        text: "Clique na nuvem azul do <strong>OneDrive</strong> perto do relógio do Windows e verifique se aparece a mensagem <em>Seus arquivos estão sincronizados</em>.",
      },
      {
        lead: "Atenção a ícones vermelhos ou pausados",
        text: 'Se aparecer um "X" vermelho ou ícone de pausa, clique sobre a nuvem para ver qual arquivo está com nome inválido ou aberto bloqueando a sincronização.',
      },
    ],
  },

  // TEMA 5: SUPORTE E RESOLUÇÃO DE PROBLEMAS (POP-029 a POP-035)
  {
    code: "POP-029",
    themeId: 5,
    goal: "Para realizar diagnóstico inicial de rede",
    title: "Notebook não conecta ao Wi-Fi",
    keywords: "wifi nao conecta internet sem rede modo aviao senha wifi",
    steps: [
      {
        lead: "Confira o Modo Avião e o botão de Wi-Fi",
        text: "Clique no ícone de rede ao lado do relógio e verifique se o <strong>Modo Avião</strong> está desligado e o <strong>Wi-Fi</strong> está ativado.",
      },
      {
        lead: "Desconecte e reconecte à rede",
        text: "Clique em <strong>Desconectar</strong> na rede atual, aguarde 10 segundos e conecte novamente. Se a senha da rede mudou recentemente, clique com o botão direito na rede, escolha <strong>Esquecer</strong> e digite a nova senha.",
      },
      {
        lead: "Teste outro aparelho e reinicie o Windows",
        text: 'Verifique se seu celular conecta ao mesmo Wi-Fi. Se o celular funciona e o notebook não, reinicie o Windows pelo menu Iniciar (<pop code="POP-005">POP-005</pop>).',
      },
    ],
  },
  {
    code: "POP-030",
    themeId: 5,
    goal: "Para executar checklist básico de desempenho",
    title: "Notebook está lento: o que fazer?",
    keywords: "notebook lento checklist o que fazer travando devagar",
    steps: [
      {
        lead: "Feche abas e programas pesados",
        text: 'Abra o Gerenciador de Tarefas (<pop code="POP-002">POP-002</pop>) e encerre aplicativos que não estão sendo usados no momento.',
      },
      {
        lead: "Verifique o espaço no SSD e o Windows Update",
        text: 'Confira se há ao menos 15% de espaço livre no Disco C: (<pop code="POP-006">POP-006</pop>) e se o Windows não está baixando atualizações grandes em segundo plano (<pop code="POP-008">POP-008</pop>).',
      },
      {
        lead: "Reinicie o equipamento",
        text: 'Execute uma reinicialização completa pelo menu <strong>Iniciar &gt; Ligar/Desligar &gt; Reiniciar</strong>. Se a lentidão persistir após reiniciar, abra um chamado para a TI (<pop code="POP-033">POP-033</pop>).',
      },
    ],
  },
  {
    code: "POP-031",
    themeId: 5,
    goal: "Para recuperar o funcionamento do aplicativo",
    title: "Aplicativo parou de responder",
    keywords: "aplicativo parou de responder excel word travou fechou",
    steps: [
      {
        lead: "Aguarde 30 segundos",
        text: "Se o programa estiver salvando um arquivo grande ou gerando um relatório pesado, ele pode destravar sozinho em instantes.",
      },
      {
        lead: "Finalize apenas o programa congelado",
        text: 'Pressione <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Esc</kbd>, selecione o aplicativo marcado como <em>Não respondendo</em> e clique em <strong>Finalizar tarefa</strong> (<pop code="POP-007">POP-007</pop>).',
      },
      {
        lead: "Reabra e recupere o arquivo",
        text: "Ao abrir o programa novamente (como Word ou Excel), verifique o painel lateral de <em>Recuperação de Documentos</em>.",
      },
    ],
  },
  {
    code: "POP-032",
    themeId: 5,
    goal: "Para realizar verificações iniciais de energia",
    title: "Notebook não liga",
    keywords: "nao liga tela preta morto bateria energia botao power",
    steps: [
      {
        lead: "Teste a tomada e o LED do carregador",
        text: "Conecte o carregador diretamente em outra tomada funcional (sem benjamins ou réguas com defeito) e confira se a luz indicadora de carga acende no notebook.",
      },
      {
        lead: "Remova todos os acessórios externos",
        text: "Desconecte pendrives, mouses, cabos HDMI e hubs USB — um periférico em curto pode impedir a inicialização.",
      },
      {
        lead: "Faça a descarga residual",
        text: "Com o carregador conectado, pressione e segure o botão <strong>Ligar/Desligar por 15 segundos</strong> seguidos, solte e aperte uma vez normalmente para ligar.",
      },
    ],
  },
  {
    code: "POP-033",
    themeId: 5,
    goal: "Para padronizar solicitações de suporte",
    title: "Como abrir um chamado de TI",
    keywords: "abrir chamado suporte ti ajuda ticket atendimento",
    steps: [
      {
        lead: "Acesse o portal oficial de suporte",
        text: "Entre na central de chamados da TI e escolha a categoria mais próxima do seu problema ou solicitação.",
      },
      {
        lead: "Preencha os dados essenciais do chamado",
        text: "Informe o que você estava tentando fazer, qual sistema apresentou falha, a etiqueta de patrimônio do notebook e se o problema impede totalmente o seu trabalho.",
      },
    ],
  },
  {
    code: "POP-034",
    themeId: 5,
    goal: "Para agilizar o atendimento técnico",
    title: "Como coletar informações de um erro",
    keywords: "erro codigo print coletar evidencias mensagem falha",
    steps: [
      {
        lead: "Tire um print completo da mensagem de erro",
        text: 'Use <kbd>Win</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> (<pop code="POP-026">POP-026</pop>) capturando tanto o aviso de erro quanto a janela do sistema ao fundo.',
      },
      {
        lead: "Anote o horário e anexe no chamado",
        text: "Registre a hora aproximada em que o erro ocorreu e anexe a captura de tela diretamente na abertura do chamado de TI.",
      },
    ],
  },
  {
    code: "POP-035",
    themeId: 5,
    goal: "Para realizar recuperação segura",
    title: "O que fazer quando o notebook trava",
    keywords: "notebook travou congelou mouse nao mexe tela congelada",
    steps: [
      {
        lead: "Tente destravar a tela com o atalho de vídeo",
        text: "Se o cursor do mouse não se move ou a imagem congelou, pressione juntas as teclas <kbd>Win</kbd> + <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>B</kbd>. A tela piscará rapidamente enquanto o driver de vídeo reinicia sem fechar seus programas.",
      },
      {
        lead: "Tente acessar o menu de segurança",
        text: "Pressione <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>Del</kbd> para tentar abrir o Gerenciador de Tarefas ou reiniciar o Windows.",
      },
      {
        lead: "Reinicialização forçada (apenas em último caso)",
        text: "Se o equipamento continuar sem nenhuma resposta após 3 minutos, pressione e segure o botão <strong>Ligar/Desligar por 10 segundos</strong> até desligar por completo, aguarde 5 segundos e ligue novamente.",
      },
    ],
  },

  // NOVOS POPS ADICIONADOS (POP-036 a POP-038)
  {
    code: "POP-036",
    themeId: 4,
    goal: "Para corrigir erros e falhas de sincronização no OneDrive",
    title: "Como resolver erros de sincronização no OneDrive",
    keywords: "onedrive erro sincronizacao nuvem x vermelho pausado sincronizar nao sincroniza",
    steps: [
      {
        lead: "Verifique o ícone da nuvem na bandeja do sistema",
        text: "Olhe perto do relógio do Windows (canto inferior direito) e clique no ícone do <strong>OneDrive</strong> para identificar se há um alerta de erro (<strong>X vermelho</strong>) ou sincronização pausada (traços paralelos).",
      },
      {
        lead: "Confira se a sincronização está pausada",
        text: "Clique na nuvem do OneDrive, selecione o <strong>ícone de engrenagem (Ajuda e Configurações)</strong> e clique em <strong>Retomar sincronização</strong> caso esteja pausada.",
      },
      {
        lead: "Verifique caracteres inválidos ou nomes muito longos",
        text: 'Confira o nome do arquivo apontado no aviso de erro. Remova caracteres proibidos (<code class="inline-code">\\ / : * ? " &lt; &gt; |</code>) e evite nomes de arquivos ou subpastas excessivamente longos dentro das pastas sincronizadas.',
      },
      {
        lead: "Reinicie o aplicativo do OneDrive com segurança",
        text: 'Clique na <strong>engrenagem &gt; Fechar o OneDrive</strong>. Em seguida, pressione <kbd>Win</kbd> + <kbd>R</kbd>, digite <code class="inline-code">%localappdata%\\Microsoft\\OneDrive\\onedrive.exe</code> e pressione <kbd>Enter</kbd> para reabrir o serviço.',
      },
      {
        lead: "Desvincule e reconecte a conta (se o erro persistir)",
        text: "Acesse <strong>Engrenagem &gt; Configurações &gt; Conta &gt; Desvincular este computador</strong> e faça login novamente com seu e-mail corporativo. Seus arquivos já baixados não são apagados nesse processo.",
      },
    ],
  },
  {
    code: "POP-037",
    themeId: 1,
    goal: "Para resolver lentidão causada pelo OneDrive e serviços em nuvem",
    title: "Como corrigir lentidão no OneDrive e serviços relacionados",
    keywords: "onedrive lento lentidao nuvem banda internet travando webview2 arquivos sob demanda",
    steps: [
      {
        lead: "Ative os Arquivos Sob Demanda (Files On-Demand)",
        text: "Clique na nuvem do OneDrive &gt; <strong>Engrenagem &gt; Configurações &gt; Sincronização e backup &gt; Configurações avançadas</strong> e deixe ativada a opção <strong>Arquivos Sob Demanda</strong>, evitando que todos os arquivos da nuvem ocupem disco e internet continuamente.",
      },
      {
        lead: "Libere espaço de pastas pesadas já baixadas",
        text: "Abra o Explorador de Arquivos (<kbd>Win</kbd> + <kbd>E</kbd>), clique com o botão direito sobre pastas antigas ou pesadas no OneDrive e selecione <strong>Liberar espaço</strong> para mantê-las apenas na nuvem (ícone de nuvem azul).",
      },
      {
        lead: "Limite a taxa de upload e download",
        text: "Se a sincronização estiver consumindo toda a banda e deixando sistemas web lentos, abra <strong>Configurações &gt; Sincronização e backup &gt; Limitar taxa de download/upload</strong> e defina um limite automático ou fixo.",
      },
      {
        lead: "Pause temporariamente durante reuniões ou envios críticos",
        text: "Clique na <strong>engrenagem &gt; Pausar sincronização &gt; 2 horas</strong> sempre que estiver em chamadas de vídeo importantes ou enviando arquivos urgentes.",
      },
      {
        lead: "Verifique processos do OneDrive no Gerenciador de Tarefas",
        text: 'Pressione <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Esc</kbd> (<pop code="POP-002">POP-002</pop>) e observe se <em>Microsoft OneDrive</em> ou <em>Microsoft Edge WebView2</em> estão com uso elevado de disco/rede; caso estejam travados, reinicie o cliente conforme o <pop code="POP-036">POP-036</pop>.',
      },
    ],
  },
  {
    code: "POP-038",
    themeId: 4,
    goal: "Para corrigir erro de escala e imagem distorcida no monitor externo",
    title: "Como corrigir erro de escala ajustando resolução e taxa de atualização (abaixo de 59Hz)",
    keywords: "monitor escala erro de escala resolucao taxa de atualizacao 59hz 50hz hz imagem distorcida tela cortada",
    steps: [
      {
        lead: "Abra as Configurações de exibição do Windows",
        text: "Clique com o botão direito em uma área vazia da Área de Trabalho e selecione <strong>Configurações de exibição</strong> (ou pressione <kbd>Win</kbd> + <kbd>I</kbd> e acesse <strong>Sistema &gt; Tela</strong>).",
      },
      {
        lead: "Selecione o monitor afetado no diagrama superior",
        text: "Clique sobre o retângulo correspondente ao monitor externo com erro de escala (<strong>Monitor 1</strong> ou <strong>Monitor 2</strong>) para garantir que os ajustes sejam aplicados na tela correta.",
      },
      {
        lead: "Reduza a Resolução da tela",
        text: "Na seção <strong>Escala e layout</strong>, abra o menu suspenso <strong>Resolução de tela</strong>, selecione um padrão compatível imediatamente inferior (por exemplo, de <em>1920 × 1080</em> para <em>1600 × 900</em> ou <em>1366 × 768</em>) e clique em <strong>Manter alterações</strong>.",
      },
      {
        lead: "Acesse a Exibição avançada",
        text: "Role a janela de Configurações de Tela até o final e clique em <strong>Exibição avançada</strong> (ou <em>Configurações avançadas de tela</em>).",
      },
      {
        lead: "Defina obrigatoriamente a Taxa de atualização abaixo de 59Hz",
        text: "No campo <strong>Escolher uma taxa de atualização</strong>, abra o menu e selecione <strong>50 Hz</strong> (ou a opção disponível abaixo de 59Hz, como <em>50,00 Hz</em>). Clique em <strong>Manter alterações</strong> para estabilizar a escala e eliminar cortes ou distorções na imagem.",
      },
    ],
  },
];
