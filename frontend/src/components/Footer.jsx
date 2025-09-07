import React from 'react';

function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>
          <b>CodeCraft</b>: Where ideas become code. Created by{' '}
          <a 
            href="https://www.linkedin.com/in/apoorv-pachori" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="font-medium underline hover:text-primary"
          >
            Apoorv
          </a>❤️
        </p>
      </div>
    </footer>
  );
}

export default Footer;
