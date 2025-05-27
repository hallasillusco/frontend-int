import { Component } from '@angular/core';
import { ChatbotService } from '@core/service/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  message: string = '';
  messages: Array<{text: string, isUser: boolean}> = [];
  isOpen: boolean = false;

  constructor(private chatbotService:ChatbotService ) {}

  toggleChatbot() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.message.trim() === '') {
      return;
    }
  
    const userMessage = this.message;
    this.messages.push({ text: userMessage, isUser: true });
    this.message = '';
  
    this.chatbotService.sendMessage(userMessage).subscribe(
      (res) => {
        // Reemplaza cualquier URL en el mensaje por un link clicable
        const botResponse = res.response.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
        this.messages.push({ text: botResponse, isUser: false });
        
        setTimeout(() => {
          const chatBox = document.getElementById('chat-box');
          if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
          }
        }, 100);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  


}
