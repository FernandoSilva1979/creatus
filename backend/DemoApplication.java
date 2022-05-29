package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import com.repository.FilmeRepository;
import org.springframework.boot.CommandLineRunner;
import com.model.Filme;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {

		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(FilmeRepository filmeRepository) {
		return args -> {
			// courseRepository.deleteAll();

			Filme c = new Filme();
			c.setAutor("autor");
			c.setDescricao("descricao");
			c.setTitulo("titulo");
			c.setImagemfilme("sss");

			filmeRepository.save(c);
			filmeRepository.save(c);
			filmeRepository.save(c);
		};
	}

}
